import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@expo/ex-navigation';
import PatientIcon from 'components/PatientIcon';
import { selectPatient } from 'modules/patient';


const mapStateToProps = (state, ownProps) => ({
  patient: state.entities.patients[ownProps.patientId],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectPatient: () => {
    dispatch(selectPatient(ownProps.patientId));
  },
});

@withNavigation
class PatientSearchResult extends React.Component {
  handlePress = () => {
    const { patient } = this.props;

    this.props.selectPatient();
    this.props.navigator.push('patient', { name: `${patient.firstName} ${patient.lastName}` });
  }

  render() {
    const { patient } = this.props;

    return (
      <TouchableHighlight onPress={this.handlePress} style={styles.wrapper} underlayColor="#e6f7ff">
        <View style={styles.container}>
          <PatientIcon uri={patient.photoUri} sex={patient.sex} />
          <View style={styles.description}>
            <Text style={styles.name}>{`${patient.lastName}, ${patient.firstName} (${patient.sex})`}</Text>
            <Text style={styles.details}>{`DOB: ${patient.dob}`}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
    flexDirection: 'row',
    padding: 10,
  },
  description: {
    marginLeft: 10,
  },
  name: {
    fontSize: 15,
  },
  details: {
    color: '#676767',
    fontSize: 13,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchResult);
