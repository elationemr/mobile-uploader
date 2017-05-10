import React from 'react';
import { View, StyleSheet } from 'react-native';


export default class BaseView extends React.Component {

  static defaultProps = {
    centered: false,
  }

  render() {
    const { centered, children } = this.props;

    return <View style={[styles.base, styles[centered ? 'centered' : 'default']]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  default: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
