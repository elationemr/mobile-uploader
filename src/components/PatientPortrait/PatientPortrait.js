import React from 'react';
import { Image, StyleSheet } from 'react-native';


export default class PatientPortrait extends React.Component {
  render() {
    const { sex, uri } = this.props;

    let source = {};
    if (uri) {
      source.uri = uri;
    } else if (sex === 'M') {
      source = require('./male-patient-avatar.png');
    } else if (sex === 'F') {
      source = require('./female-patient-avatar.png');
    } else {
      source = require('./unknown-patient-avatar.png');
    }

    return (
      <Image source={source} style={styles.photo} />
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    height: 125,
    width: 125,
    borderWidth: 1,
    borderColor: '#777',
  },
});
