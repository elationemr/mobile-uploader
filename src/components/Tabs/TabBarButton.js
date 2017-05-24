import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from 'styles';


export default class TabBarButton extends React.Component {

  handlePress = () => {
    const { title, onPress } = this.props;

    onPress(title);
  }

  render() {
    const { isActive, title } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isActive}
        onPress={this.handlePress}
        style={styles.label}
      >
        <Text style={[styles.text, isActive && styles.active]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.INACTIVE_GREY,
    fontSize: 16,
  },
  active: {
    color: colors.APP_PRIMARY,
  },
});
