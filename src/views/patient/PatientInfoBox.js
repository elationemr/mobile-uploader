import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import PatientPortrait from 'components/PatientPortrait';
import { getSelectedPatient } from 'modules/patient';
import { setPatientPhoto, removePatientPhoto } from 'modules/entities';
import { dimensions } from 'styles';


const mapStateToProps = state => ({
  patient: getSelectedPatient(state),
});

const mapDispatchToProps = dispatch => ({
  setPatientPhoto: (patientId, uri) => {
    dispatch(setPatientPhoto(patientId, uri));
  },
  removePatientPhoto: (patientId) => {
    dispatch(removePatientPhoto(patientId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  setPatientPhoto: (uri) => {
    dispatchProps.setPatientPhoto(stateProps.patient.id, uri);
  },
  removePatientPhoto: () => {
    dispatchProps.removePatientPhoto(stateProps.patient.id);
  },
});

@connectActionSheet
class PatientInfoBox extends React.Component {

  static actionOptions = {
    options: [
      'Remove Photo',
      'Take Photo',
      'Upload From Library',
      'Cancel',
    ],
    cancelButtonIndex: 3,
    destructiveButtonIndex: 0,
  }

  static getSexDisplayString = (sex) => {
    if (sex === 'M') {
      return 'Male';
    } else if (sex === 'F') {
      return 'Female';
    } else {
      return 'Unknown Sex';
    }
  }

  takePatientPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }

    this.props.setPatientPhoto(result.uri);
  }

  uploadPatientPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (result.cancelled) {
      return;
    }

    this.props.setPatientPhoto(result.uri);
  }

  removePatientPhoto = () => {
    this.props.removePatientPhoto();
  }

  handlePhotoPress = () => {
    const { showActionSheetWithOptions } = this.props;

    showActionSheetWithOptions(
      PatientInfoBox.actionOptions,
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.removePatientPhoto();
            break;
          case 1:
            this.takePatientPhoto();
            break;
          case 2:
            this.uploadPatientPhoto();
            break;
        }
      }
    );
  }

  render() {
    const { patient } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePhotoPress} style={styles.photoWrapper}>
          <PatientPortrait uri={patient.photoUri} sex={patient.sex} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.name}>{`${patient.firstName} ${patient.lastName}`}</Text>
          <Text>D.O.B.: {patient.dob}</Text>
          <Text>{PatientInfoBox.getSexDisplayString(patient.sex)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: dimensions.GUTTER_WIDTH_LARGE,
  },
  photoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 125,
    width: 125,
  },
  info: {
    flex: 1,
    marginLeft: dimensions.GUTTER_WIDTH_LARGE,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PatientInfoBox);
