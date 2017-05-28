import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, dimensions } from 'styles';


export default class Row extends React.Component {

  static propTypes = {
    padded: React.PropTypes.bool,
  }

  static defaultProps = {
    padded: true,
  }

  render() {
    const { padded, style, children } = this.props;

    return <View style={[styles.base, padded && styles.padded, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: dimensions.ROW_HEIGHT_SMALL,
    backgroundColor: '#fff',
    borderColor: colors.HAIRLINE_BORDER,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  padded: {
    paddingHorizontal: dimensions.GUTTER_WIDTH_SMALL,
  },
});
