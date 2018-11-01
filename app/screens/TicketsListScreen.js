import React, {Component} from 'react';
import {Text, View} from 'react-native';


export default class TicketsList extends Component {
  static navigationOptions = {
    title: 'Заявки',
  };

  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    }
  }

  componentDidMount() {
    console.log(axios.defaults.headers.common['Authorization']);
    axios.get('tickets')
      .then(response => {
        this.setState({tickets: response.data.data});
      })
  }

  renderRow(item) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} key={item.id}>
        <Text>{item.title}</Text>
        <Text>{_.get(item, 'applicant.name', item.applicant_name)}</Text>
        <Text>{_.get(item, 'status.name', 'Нет данных')}</Text>
      </View>
    );
  }

  render() {
    const data = this.state.tickets;
    return (

      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 20,
        flexDirection: 'column',
      }}>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{fontWeight: 'bold'}}>Тема</Text>
          <Text style={{fontWeight: 'bold'}}>Клиент</Text>
          <Text style={{fontWeight: 'bold'}}>Статус</Text>
        </View>

        {data.map(item => this.renderRow(item))}

      </View>
    );
  }
}