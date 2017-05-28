import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Row from 'components/Row';


export default class WideNavButton extends React.Component {

  static defaultProps = {
    icon: null,
  }

  render() {
    const { title, onPress, icon: _icon, type, style } = this.props;

    let icon = _icon;
    if (!icon && type) {
      switch (type) {
        case 'nav':
          icon = <Entypo name="chevron-thin-right" />;
          break;
      }
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.wrapper}>
        <Row style={style}>
          <Text style={styles.text}>{title}</Text>
          {icon}
        </Row>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 16,
  },
});
