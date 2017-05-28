import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { dimensions } from 'styles';


export default class Label extends React.Component {
  render() {
    const { children, style, ...props } = this.props;

    return <Text style={[styles.label, style]} {...props}>{children}</Text>;
  }
}

const styles = StyleSheet.create({
  label: {
    color: '#888',
    fontSize: 15,
    marginHorizontal: dimensions.GUTTER_WIDTH_SMALL,
    marginVertical: 3,
  },
});
