import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default class WideNavButton extends React.Component {

  static defaultProps = {
    noIcon: false,
  }

  render() {
    const { title, onPress, noIcon } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        <View style={styles.view}>
          <Text style={styles.text}>{title}</Text>
          {!noIcon && <Entypo name="chevron-thin-right" />}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
  },
});
