import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles';


/**
 * A visual component representing a 100% width 'sheet' of paper. Should be used
 * as a child of a parent with flexDirection: column.
 */
export default class Sheet extends React.Component {
  render() {
    const { children, style } = this.props;

    return <View style={[styles.base, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: colors.HAIRLINE_BORDER,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
