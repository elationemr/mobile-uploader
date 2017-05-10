import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default class PatientPortrait extends React.Component {

  render() {
    const { sex, uri } = this.props;

    let source = {};
    if (uri) {
      source.uri = uri;
    } else if (sex === 'F') {
      source = require('./pt_pic_default_f.png');
    } else {
      source = require('./pt_pic_default.png');
    }

    return (
      <Image source={source} style={styles.photo} />
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    height: 50,
    width: 50,
  },
});
