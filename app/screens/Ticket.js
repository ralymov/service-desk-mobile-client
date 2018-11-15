import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export default class Ticket extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Заявка №' + navigation.getParam('ticketId', null),
  });

  constructor(props) {
    super(props);
    this.state = {
      ticket: {
        status_id: null,
      },
      ticketStatuses: [],
    }
  }

  componentDidMount() {
    const ticketId = this.props.navigation.getParam('ticketId', null);
    axios.get('tickets/' + ticketId)
      .then(response => this.setState({ticket: response.data}));
    axios.get('ticketStatuses/')
      .then(response => this.setState({ticketStatuses: response.data}));
  }

  updateStatus(value) {
    let ticket = {...this.state.ticket};
    ticket.status_id = value;
    this.setState({ticket});
    axios.put('tickets/' + this.state.ticket.id, {'status_id': value})
      .then(response => this.setState({ticket: response.data}));
  }

  renderPickerOption(item) {
    return (
      <Picker.Item label={item.name} value={item.id} key={item.id}/>
    );
  }

  render() {
    const ticketStatuses = this.state.ticketStatuses;
    return (
      <View style={!this.state.ticket.id ? [styles.container, styles.horizontal] : []}>
        {!this.state.ticket.id ?
          <ActivityIndicator size="large" color="#00ff00"/>
          :
          <View style={styles.card}>
            <Text style={styles.cardHeader}>{'Заявка №' + this.props.navigation.getParam('ticketId', '???')}</Text>
            <View style={styles.cardDivider}/>

            <Text style={styles.cardText}>
              Тема заявки: {_.get(this.state.ticket, 'applicant.name', this.state.ticket.applicant_name)}
            </Text>
            <Text style={styles.cardText}>
              {
                'Место: ' + (_.get(this.state.ticket, 'applicant.department.location.name')
                  || _.get(this.state.ticket, 'applicant_location.name', 'Нет данных'))
              }
            </Text>
            <Text style={styles.cardText}>Суть заявки: {this.state.ticket.description}</Text>
            <Text style={styles.cardText}>Была создана: {this.state.ticket.created_at}</Text>
            <Text style={styles.cardText}>Приоритет: {_.get(this.state.ticket, 'priority.name', 'Нет данных')}</Text>
            <Text style={styles.cardText}>Тип: {_.get(this.state.ticket, 'type.name', 'Нет данных')}</Text>
            <Text style={styles.cardText}>Статус: {_.get(this.state.ticket, 'status.name')}</Text>

            <Picker
              selectedValue={this.state.ticket.status_id}
              onValueChange={(itemValue) => this.updateStatus(itemValue)}>
              {ticketStatuses.map(item => this.renderPickerOption(item))}
            </Picker>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardHeader: {
    backgroundColor: '#3eff14',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
  cardText: {
    textAlign: 'center',
    marginTop: 10,
  },
  cardDivider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  cardButton: {
    marginTop: 15,
  },
});