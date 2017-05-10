import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import BaseView from 'components/BaseView';


class UploadInsuranceView extends React.Component {

  static route = {
    navigationBar: {
      title(params) {
        return params.name;
      },
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

const imageSize = Dimensions.get('window').width - 10;

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: '#999',
    height: imageSize,
    width: imageSize,
  },
});

export default UploadInsuranceView;
