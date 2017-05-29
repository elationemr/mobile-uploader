import React from 'react';
import { StyleSheet } from 'react-native';
import Sheet from 'components/Sheet';
import { dimensions } from 'styles';


export default class Row extends React.Component {

  static propTypes = {
    padded: React.PropTypes.bool,
  }

  static defaultProps = {
    padded: true,
  }

  render() {
    const { padded, style, children } = this.props;

    return <Sheet style={[styles.base, padded && styles.padded, style]}>{children}</Sheet>;
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: dimensions.ROW_HEIGHT_SMALL,
  },
  padded: {
    paddingHorizontal: dimensions.GUTTER_WIDTH_SMALL,
  },
});
