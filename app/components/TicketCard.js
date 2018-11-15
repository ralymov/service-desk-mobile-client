import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';

class TicketCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.cardHeader}>{'Заявка №' + this.props.ticket.id}</Text>
        <View style={styles.cardDivider}/>

        <Text style={styles.cardText}>
          Тема заявки: {_.get(this.props.ticket, 'applicant.name', this.props.ticket.applicant_name)}
        </Text>
        <Text style={styles.cardText}>
          {
            'Место: ' + (_.get(this.props.ticket, 'applicant.department.location.name')
              || _.get(this.props.ticket, 'applicant_location.name', 'Нет данных'))
          }
        </Text>
        <Text style={styles.cardText}>
          Статус: {_.get(this.props.ticket, 'status.name')}
        </Text>

        <View style={styles.cardButton}>
          <Button onPress={() => this.props.navigation.navigate('Ticket', {ticketId: this.props.ticket.id})}
                  title="Открыть"
                  color="#3eff14"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});

export default withNavigation(TicketCard);