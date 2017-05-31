import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigation } from '@expo/ex-navigation';
import LoginView from 'views/login/LoginView';
import { colors } from 'styles';


const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

class AppContent extends React.Component {

  state = {
    fadeInOpacity: new Animated.Value(0),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      this.setState({ fadeInOpacity: new Animated.Value(0) });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      Animated.timing(
        this.state.fadeInOpacity,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
        }
      ).start();
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    const { fadeInOpacity } = this.state;

    if (isAuthenticated) {
      return (
        <Animated.View style={[styles.fadeWrapper, { opacity: fadeInOpacity }]}>
          <StackNavigation
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: colors.APP_PRIMARY,
                tintColor: '#fff',
              },
            }}
            initialRoute="patientSearch"
          />
        </Animated.View>
      );
    }

    return <LoginView />;
  }
}

const styles = StyleSheet.create({
  fadeWrapper: {
    flex: 1,
  },
});

export default connect(mapStateToProps)(AppContent);
