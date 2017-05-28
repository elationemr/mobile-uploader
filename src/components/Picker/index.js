/**
 * Because the native iOS picker is pretty much unusable in forms as-is.
 * Our custom IOSPicker turns the picker into a row button that can be pressed
 * to bring up the native iOS picker in a modal.
 */
import { Picker as NativePicker, Platform } from 'react-native';
import iosPicker from './IOSPicker';


let Picker = NativePicker;
if (Platform.OS === 'ios') {
  Picker = iosPicker;
  Picker.Item = NativePicker.Item;
}

export default Picker;
