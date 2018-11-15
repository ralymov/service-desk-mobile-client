import React, {Component} from 'react';
import {AsyncStorage, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
  }

  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Button
        onPress={this.signOut.bind(this)}
        title="Выход"
      />
    )
  }
}

export default withNavigation(LogoutButton);