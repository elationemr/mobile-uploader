import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import BaseView from 'components/BaseView';
import Label from 'components/Label';
import NavBarButton from 'components/NavBarButton';
import RowTextInput from 'components/RowTextInput';
import Sheet from 'components/Sheet';
import Tabs, { TabItem } from 'components/Tabs';
import DocumentInput from 'views/shared/DocumentInput';
import { colors } from 'styles';


class UploadInsuranceView extends React.Component {

  static route = {
    navigationBar: {
      title: "Insurance Card",
      renderRight: (route, props) => (
        <NavBarButton
          title="Upload"
          onPress={() => {
            if (!route.params.front) {
              Alert.alert('Upload Insurance Card', 'Please select a card front.');
            } else if (!route.params.back) {
              Alert.alert('Upload Insurance Card', 'Please select a card back.');
            } else {
              Alert.alert('Upload Insurance Card', 'All good.');
            }
          }}
        />
      ),
    },
  }

  state = {
    title: '',
    activeTab: 'Front',
    front: null,
    back: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.front !== this.state.front) {
      this.props.navigator.updateCurrentRouteParams({
        front: this.state.front,
      });
    }
    if (prevState.back !== this.state.back) {
      this.props.navigator.updateCurrentRouteParams({
        back: this.state.back,
      });
    }
  }

  handleTitleChange = (value) => {
    this.setState({ title: value });
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  }

  handleFrontPhotoChange = (result) => {
    this.setState({
      front: {
        type: 'photo',
        uri: result.uri,
        height: result.height,
        width: result.width,
      },
    });
  }

  handleBackPhotoChange = (result) => {
    this.setState({
      back: {
        type: 'photo',
        uri: result.uri,
        height: result.height,
        width: result.width,
      },
    });
  }

  handleFrontDocumentChange = (result) => {
    this.setState({
      front: {
        type: 'document',
        uri: result.uri,
        name: result.name,
      },
    });
  }

  handleBackDocumentChange = (result) => {
    this.setState({
      back: {
        type: 'document',
        uri: result.uri,
        name: result.name,
      },
    });
  }

  render() {
    const { title, activeTab, front, back } = this.state;

    return (
      <BaseView style={styles.view}>
        <ScrollView>
          <Label style={styles.label}>Title</Label>
          <RowTextInput
            placeholder="Document title"
            value={title}
            onChangeText={this.handleTitleChange}
          />
          <Label style={styles.label}>Document (Required)</Label>
          <Sheet>
            <Tabs activeTab={activeTab} onChange={this.handleTabChange}>
              <TabItem name="Front">
                <DocumentInput
                  document={front}
                  onPhotoChange={this.handleFrontPhotoChange}
                  onDocumentChange={this.handleFrontDocumentChange}
                />
              </TabItem>
              <TabItem name="Back">
                <DocumentInput
                  document={back}
                  onPhotoChange={this.handleBackPhotoChange}
                  onDocumentChange={this.handleBackDocumentChange}
                />
              </TabItem>
            </Tabs>
          </Sheet>
        </ScrollView>
      </BaseView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.FORM_BG,
  },
  label: {
    marginTop: 15,
  },
});

export default UploadInsuranceView;
