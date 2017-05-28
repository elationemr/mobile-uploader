import React from 'react';
import { connect } from 'react-redux';
import BaseView from 'components/BaseView';
import WideButton from 'components/WideButton';
import { getSelectedPatient } from 'modules/patient';
import PatientInfoBox from './PatientInfoBox';


const mapStateToProps = state => ({
  patient: getSelectedPatient(state),
});

class PatientView extends React.Component {

  static route = {
    navigationBar: {
      title(params) {
        return params.name;
      },
    },
  }

  handleInsuranceUploadPress = () => {
    const { patient } = this.props;

    this.props.navigator.push('uploadInsurance', { name: `${patient.firstName} ${patient.lastName}` });
  }

  handleDocumentUploadPress = () => {
    const { patient } = this.props;

    this.props.navigator.push('uploadDocument', { name: `${patient.firstName} ${patient.lastName}` });
  }

  render() {
    return (
      <BaseView>
        <PatientInfoBox />
        <WideButton type="nav" title="Upload Insurance Card" onPress={this.handleInsuranceUploadPress} />
        <WideButton type="nav" title="Upload Other Document" onPress={this.handleDocumentUploadPress} />
      </BaseView>
    );
  }
}

export default connect(mapStateToProps)(PatientView);
