import { Alert } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

/**
 * Ensures that the user has granted the app camera permissions, and then prompts
 * the user to take a photo.
 *
 * @returns {object|null} - a results object if the user took a photo, or null if
 * the user did not grant camera permission or cancelled taking the photo.
 */
export default async function takePhotoAsync(options = {}) {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    Alert.alert('Please enable permissions in iOS Settings.');
    return null;
  }

  let result = await ImagePicker.launchCameraAsync(options);

  if (result.cancelled) {
    return null;
  }

  return result;
}
