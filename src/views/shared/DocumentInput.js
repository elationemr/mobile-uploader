import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DocumentPicker, ImagePicker, Permissions } from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import Sheet from 'components/Sheet';
import takePhotoAsync from 'utils/camera/takePhotoAsync';


@connectActionSheet
export default class DocumentInput extends React.Component {

  static propTypes = {
    onPhotoChange: React.PropTypes.func.isRequired,
    onDocumentChange: React.PropTypes.func.isRequired,
  }

  getScaledImageSize = () => {
    const { document } = this.props;

    if (!document || document.type !== 'photo') {
      return null;
    }

    const scaledWidth = Math.min(document.width, Dimensions.get('window').width);
    const scaledHeight = (document.height / document.width) * scaledWidth;
    return {
      height: scaledHeight,
      width: scaledWidth,
    };
  }

  tryPermissionAsync = async (permission) => {
    const { status } = await Permissions.getAsync(permission);
    if (status !== 'granted') {
      Alert.alert('Please enable permissions in iOS Settings.');
      return false;
    }
    return true;
  }

  takePhotoAsync = async () => {
    const result = await takePhotoAsync();

    if (!result) {
      return;
    }

    this.props.onPhotoChange(result);
  }

  selectPhotoAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});

    if (result.cancelled) {
      return;
    }

    this.props.onPhotoChange(result);
  }

  selectDocumentAsync = async () => {
    let result;
    try {
      result = await DocumentPicker.getDocumentAsync({});
    } catch (error) {
      Alert.alert('Error', 'There was an error retrieving this document.');
      return;
    }

    if (result.type === 'cancel') {
      return;
    }

    this.props.onDocumentChange(result);
  }

  handleDocumentPress = () => {
    const { showActionSheetWithOptions } = this.props;

    showActionSheetWithOptions(
      {
        options: [
          'Take Photo',
          'Select Photo From Library',
          'Select Document',
          'Cancel',
        ],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoAsync();
            break;
          case 1:
            this.selectPhotoAsync();
            break;
          case 2:
            this.selectDocumentAsync();
            break;
        }
      }
    );
  }

  render() {
    const { document } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.handleDocumentPress}>
        <Sheet
          style={[
            styles.docContainer,
            (!document || document.type === 'document') && { padding: 20 },
          ]}
        >
          {!document && <Text>Tap to select document or use photo as document</Text>}
          {document && document.type === 'photo' && (
            <Image source={{ uri: document.uri }} style={this.getScaledImageSize()} />
          )}
          {document && document.type === 'document' && (
            <View style={styles.selectedDocument}>
              <Ionicons name="md-document" size={48} />
              <Text>{document.name}</Text>
            </View>
          )}
        </Sheet>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  docContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDocument: {
    alignItems: 'center',
  },
});
