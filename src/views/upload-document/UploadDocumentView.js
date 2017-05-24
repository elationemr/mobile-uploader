import React from 'react';
import { Text } from 'react-native';
import Expo from 'expo';
import BaseView from 'components/BaseView';
import NavBarButton from 'components/NavBarButton';
import Tabs, { TabItem } from 'components/Tabs';


class UploadDocumentView extends React.Component {

  static route = {
    navigationBar: {
      title: 'Other Document',
      renderRight: () => <NavBarButton title="Upload" />,
    },
  }

  state = {
    activeTab: "Photo",
    uri: null,
    name: null,
    size: 0,
  }

  handleTabActivate = (title) => {
    this.setState({ activeTab: title });
  }

  handleDocumentSelect = async () => {
    let result = await Expo.DocumentPicker.getDocumentAsync({});

    if (result.type === 'cancel') {
      return;
    }

    this.setState({ uri: result.uri, name: result.name });
  }

  render() {
    const { activeTab, uri, name, size } = this.state;

    return (
      <BaseView>
        <Tabs activeTab={activeTab} onActivate={this.handleTabActivate}>
          <TabItem name="Photo">
            <Text>Photo content</Text>
          </TabItem>
          <TabItem name="Document">
            <Text>Document content</Text>
          </TabItem>
        </Tabs>
      </BaseView>
    );
  }
}

export default UploadDocumentView;
