import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';


export default class NavBarButton extends React.Component {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 7,
    paddingRight: 7,
  },
  text: {
    color: '#fff',
    // attempts to match the nav bar title's font styles as defined in
    // https://github.com/expo/ex-navigation/blob/master/src/ExNavigationBar.js
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '500',
      },
      android: {
        fontSize: 20,
      },
    }),
  },
});
