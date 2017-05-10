import React from 'react';
import { StyleSheet, TextInput } from 'react-native';


class PatientSearchInput extends React.Component {
  render() {
    return (
      <TextInput placeholder="Find patient..." style={styles.input} />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 3,
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 7,
  },
});

export default PatientSearchInput;
