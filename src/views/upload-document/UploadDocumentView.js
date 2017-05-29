import React from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { getReportTypes } from 'modules/report-types';
import BaseView from 'components/BaseView';
import Label from 'components/Label';
import NavBarButton from 'components/NavBarButton';
import Picker from 'components/Picker';
import RowTextInput from 'components/RowTextInput';
import Sheet from 'components/Sheet';
import { colors } from 'styles';


const mapStateToProps = state => ({
  reportTypes: getReportTypes(state),
});

@connectActionSheet
class UploadDocumentView extends React.Component {

  static route = {
    navigationBar: {
      title: 'Other Document',
      renderRight: (route, props) => (
        <NavBarButton
          title="Upload"
          onPress={() => {
            if (!route.params.reportTypeId) {
              Alert.alert('Upload Other Document', 'Please select a document type.');
            } else if (!route.params.document) {
              Alert.alert('Upload Other Document', 'Please select a document.');
            } else {
              Alert.alert('Upload Other Document', 'All good.');
            }
          }}
        />
      ),
    },
  }

  state = {
    reportTypeId: 0,
    title: '',
    document: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.reportTypeId !== this.state.reportTypeId) {
      this.props.navigator.updateCurrentRouteParams({
        reportTypeId: this.state.reportTypeId,
      });
    }
    if (prevState.document !== this.state.document) {
      this.props.navigator.updateCurrentRouteParams({
        document: this.state.document,
      });
    }
  }

  takePhoto = async () => {
    let result = await Expo.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }

    this.setState({
      document: {
        type: 'photo',
        uri: result.uri,
        height: result.height,
        width: result.width,
      },
    });
  }

  selectPhoto = async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }

    this.setState({
      document: {
        type: 'photo',
        uri: result.uri,
        height: result.height,
        width: result.width,
      },
    });
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

    this.setState({
      document: {
        type: 'document',
        uri: result.uri,
        name: result.name,
      },
    });
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

  handleDocumentTypeChange = (value) => {
    this.setState({ reportTypeId: Number(value) });
  }

  handleTitleChange = (value) => {
    this.setState({ title: value });
  }

  render() {
    const { reportTypes } = this.props;
    const { reportTypeId, title, document } = this.state;

    return (
      <BaseView style={styles.view}>
        <ScrollView>
          <Label style={styles.label}>Type (Required)</Label>
          <Picker
            selectedValue={reportTypeId}
            onValueChange={this.handleDocumentTypeChange}
            placeholder="Select a document type..."
          >
            {reportTypes.map(reportType => (
              <Picker.Item key={reportType.id} value={reportType.id} label={reportType.userLabel} />
            ))}
          </Picker>
          <Label style={styles.label}>Title</Label>
          <RowTextInput
            placeholder="Document title"
            value={title}
            onChangeText={this.handleTitleChange}
          />
          <Label style={styles.label}>Document (Required)</Label>
          <TouchableOpacity activeOpacity={0.7} onPress={this.handleDocumentPress}>
            <Sheet
              style={[
                styles.docContainer,
                (!document || document.type === 'document') && { padding: 20 },
              ]}
            >
              {!document && <Text>Tap to select document or use photo as document</Text>}
              {document && document.type === 'photo' && (
                <Image source={{ uri: document.uri }} style={styles.selectedImage} />
              )}
              {document && document.type === 'document' && (
                <View style={styles.selectedDocument}>
                  <Ionicons name="md-document" size={48} />
                  <Text>{document.name}</Text>
                </View>
              )}
            </Sheet>
          </TouchableOpacity>
        </ScrollView>
      </BaseView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.FORM_BG,
  },
  label: {
    marginTop: 15,
  },
  docContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    height: windowWidth,
    width: windowWidth,
  },
  selectedDocument: {
    alignItems: 'center',
  },
});

export default connect(mapStateToProps)(UploadDocumentView);
