import React from 'react';
import { Button, KeyboardAvoidingView, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import BaseView from 'components/BaseView';
import { login } from 'modules/user';
import { colors } from 'styles';


const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
});

class LoginView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  state = {
    username: '',
    password: '',
  }

  handleUsernameChange = (value) => {
    this.setState({ username: value });
  }

  handlePasswordChange = (value) => {
    this.setState({ password: value });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  render() {
    const { username, password } = this.state;

    return (
      <BaseView centered>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.header}>
            <Image source={require('./Elationemr_logo_260x40.png')} />
            <Text style={styles.title}>Mobile Uploader</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={this.handleUsernameChange}
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={this.handlePasswordChange}
                secureTextEntry
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                color={colors.APP_PRIMARY}
                title="Login"
                onPress={this.handleLogin}
                style={styles.button}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </BaseView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.APP_PRIMARY,
    fontSize: 20,
    marginTop: 12,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    alignSelf: 'stretch',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  input: {
    height: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  button: {
    alignSelf: 'stretch',
    fontSize: 20,
  },
});

export default connect(null, mapDispatchToProps)(LoginView);
