import React from 'react';
import { View, StyleSheet } from 'react-native';


export default class BaseView extends React.Component {

  static propTypes = {
    centered: React.PropTypes.bool,
  }

  static defaultProps = {
    centered: false,
  }

  render() {
    const { centered, children, style } = this.props;

    return (
      <View style={[styles.base, styles[centered ? 'centered' : 'default'], style]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  default: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
