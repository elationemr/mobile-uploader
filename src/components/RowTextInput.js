import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Row from 'components/Row';
import { dimensions } from 'styles';


export default class RowTextInput extends React.Component {
  render() {
    const { style, ...props } = this.props;

    return (
      <Row style={styles.row}>
        <TextInput style={[styles.base, style]} {...props} />
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: dimensions.GUTTER_WIDTH_SMALL,
  },
  base: {
    flex: 1,
    height: dimensions.ROW_HEIGHT_SMALL,
  },
});
