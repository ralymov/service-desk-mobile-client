import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native';

export default class LoginScreen extends Component {

  static navigationOptions = {
    title: 'Вход',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false,
      message: ''
    };
    this.login = this.login.bind(this);
  }

  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    message: ''
  };

  login() {
    axios.post('login', {username: this.state.username, password: this.state.password})
      .then(response => {
        console.log(response.data);
        this.signIn(response.data.access_token)
      })
  };

  signIn = async (token) => {
    await AsyncStorage.setItem('token', token);
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={{padding: 20}}>
        <Text
          style={{fontSize: 27, marginTop: '25%'}}>
          Вход в систему
        </Text>
        <TextInput placeholder='Логин'
                   style={styles.textInput}
                   onChangeText={username => this.setState({username})}
                   value={this.state.username}
                   autoCapitalize='none'
        />
        <TextInput placeholder='Пароль'
                   style={styles.textInput}
                   onChangeText={password => this.setState({password})}
                   value={this.state.password}
                   autoCapitalize='none'
        />
        <View style={{margin: 20}}/>
        <Button
          onPress={this.login}
          title="Войти"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    height: 40
  },
});