import React from 'react';
import { Animated, Picker as NativePicker, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import BaseView from 'components/BaseView';
import WideButton from 'components/WideButton';


// This is the height of react native's IOS picker implementation:
// https://github.com/facebook/react-native/blob/master/Libraries/Components/Picker/PickerIOS.ios.js,
// which, at time of writing this comment, is 216.
const REACT_NATIVE_IOS_PICKER_HEIGHT = 216;

const SLIDE_DURATION = 200;

export default class IOSPicker extends React.Component {

  state = {
    isOpen: false,
    overlayOpacity: new Animated.Value(0),
    pickerHeight: new Animated.Value(0),
    pickerOpacity: new Animated.Value(0),
  }

  componentDidMount() {
    this._isClosing = false;
    this._hasOpenedBefore = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isOpen && this.state.isOpen) {
      Animated.parallel([
        Animated.timing(this.state.overlayOpacity, { toValue: 0.4, duration: SLIDE_DURATION }),
        Animated.timing(this.state.pickerHeight, { toValue: REACT_NATIVE_IOS_PICKER_HEIGHT, duration: SLIDE_DURATION }),
        Animated.timing(this.state.pickerOpacity, { toValue: 1, duration: SLIDE_DURATION }),
      ]).start(() => {
        // There's an issue where the user opens the picker, sees that the picker
        // already starts on the value they want, and then closes the picker - this
        // will NOT fire an onValueChange for the value the user "picked".
        //
        // To work around this, we automatically fire onValueChange with the first
        // picker item's value when the picker is opened for the first time.
        if (!this._hasOpenedBefore) {
          let firstValue;
          React.Children.forEach(this.props.children, (child) => {
            if (!firstValue) {
              firstValue = child.props.value;
            }
          });
          this._hasOpenedBefore = true;
          this.props.onValueChange(firstValue);
        }
      });
    }
  }

  handlePickerOpen = () => {
    this.setState({ isOpen: true });
  }

  handlePickerClose = () => {
    if (!this._isClosing) {
      this._isClosing = true;
      Animated.parallel([
        Animated.timing(this.state.overlayOpacity, { toValue: 0, duration: SLIDE_DURATION }),
        Animated.timing(this.state.pickerHeight, { toValue: 0, duration: SLIDE_DURATION }),
        Animated.timing(this.state.pickerOpacity, { toValue: 0, duration: SLIDE_DURATION }),
      ]).start(() => {
        // Defer the actual closing of the picker until the animations are complete -
        // otherwise, the animations will be immediately cut short as the modal disappears
        this._isClosing = false;
        this.setState({ isOpen: false });
      });
    }
  }

  render() {
    const { placeholder, selectedValue, onValueChange, children, style } = this.props;
    const { isOpen } = this.state;

    let label;
    React.Children.forEach(children, (child) => {
      if (!label && child.props.value === selectedValue) {
        label = child.props.label;
      }
    });

    return (
      <View>
        <WideButton title={label || placeholder} onPress={this.handlePickerOpen} style={style} />
        <Modal transparent visible={isOpen}>
          <BaseView>
            <TouchableOpacity
              onPress={this.handlePickerClose}
              activeOpacity={1}
              style={styles.overlay}
            >
              <Animated.View style={[styles.shade, { opacity: this.state.overlayOpacity }]} />
            </TouchableOpacity>
            <Animated.View
              style={{
                backgroundColor: '#fff',
                height: this.state.pickerHeight,
                opacity: this.state.pickerOpacity,
              }}
            >
              <NativePicker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              >
                {children}
              </NativePicker>
            </Animated.View>
          </BaseView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  shade: {
    flex: 1,
    backgroundColor: 'black',
  },
});
