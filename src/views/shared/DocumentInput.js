import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Expo from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import Sheet from 'components/Sheet';


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

  takePhoto = async () => {
    let result = await Expo.ImagePicker.launchCameraAsync({});

    if (result.cancelled) {
      return;
    }

    this.props.onPhotoChange(result);
  }

  selectPhoto = async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({});

    if (result.cancelled) {
      return;
    }

    this.props.onPhotoChange(result);
  }

  selectDocument = async () => {
    let result;
    try {
      result = await Expo.DocumentPicker.getDocumentAsync({});
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
            this.takePhoto();
            break;
          case 1:
            this.selectPhoto();
            break;
          case 2:
            this.selectDocument();
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
