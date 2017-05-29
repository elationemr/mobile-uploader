import React from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getReportTypes } from 'modules/report-types';
import BaseView from 'components/BaseView';
import Label from 'components/Label';
import NavBarButton from 'components/NavBarButton';
import Picker from 'components/Picker';
import RowTextInput from 'components/RowTextInput';
import DocumentInput from 'views/shared/DocumentInput';
import { colors } from 'styles';


const mapStateToProps = state => ({
  reportTypes: getReportTypes(state),
});

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

  handleDocumentTypeChange = (value) => {
    this.setState({ reportTypeId: Number(value) });
  }

  handleTitleChange = (value) => {
    this.setState({ title: value });
  }

  handlePhotoChange = (result) => {
    this.setState({
      document: {
        type: 'photo',
        uri: result.uri,
        height: result.height,
        width: result.width,
      },
    });
  }

  handleDocumentChange = (result) => {
    this.setState({
      document: {
        type: 'document',
        uri: result.uri,
        name: result.name,
      },
    });
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
          <DocumentInput
            document={document}
            onPhotoChange={this.handlePhotoChange}
            onDocumentChange={this.handleDocumentChange}
          />
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
