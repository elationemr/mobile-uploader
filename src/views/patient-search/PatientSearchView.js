import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import BaseView from 'components/BaseView';
import { getPatientSearchResults } from 'modules/patient-search';
import PatientSearchInput from './PatientSearchInput';
import PatientSearchResult from './PatientSearchResult';


const mapStateToProps = state => ({
  searchResults: getPatientSearchResults(state),
});

class PatientSearchView extends React.Component {

  static route = {
    navigationBar: {
      renderTitle() {
        return <PatientSearchInput />;
      },
    },
  }

  static ITEM_HEIGHT = 70 + StyleSheet.hairlineWidth;

  extractId = (item) => {
    return item.id;
  }

  getItemLayout = (data, index) => {
    return {
      length: PatientSearchView.ITEM_HEIGHT,
      offset: PatientSearchView.ITEM_HEIGHT * index,
      index,
    };
  }

  renderResult = ({ item }) => {
    return <PatientSearchResult patientId={item.id} />;
  }

  render() {
    const { searchResults } = this.props;

    return (
      <BaseView>
        <FlatList
          data={searchResults}
          renderItem={this.renderResult}
          keyExtractor={this.extractId}
          getItemLayout={this.getItemLayout}
          style={styles.list}
        />
      </BaseView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'stretch',
  },
});

export default connect(mapStateToProps)(PatientSearchView);
