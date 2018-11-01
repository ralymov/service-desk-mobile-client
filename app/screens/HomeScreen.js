import React, {Component} from 'react';
import {
  Button,
  ScrollView,
  Text,
  View
} from 'react-native';
import LogoutButton from "../components/Auth/LogoutButton";


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Главная',
  };

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Button
          onPress={()=>this.props.navigation.navigate('TicketsList')}
          title="Заявки"
        />
        <View style={{margin: 20}}/>
        <LogoutButton/>
      </ScrollView>
    )
  }
}