import React from 'react';
import { Image, StyleSheet } from 'react-native';
import BaseView from 'components/BaseView';


class UploadDocumentView extends React.Component {

  static route = {
    navigationBar: {
      title: 'Upload Document',
    },
  }

  render() {
    return (
      <BaseView>
        <Image style={styles.image} />
        <Image style={styles.image} />
      </BaseView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: '#999',
    flex: 1,
  },
});

export default UploadDocumentView;
