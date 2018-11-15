import React, {Component} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import TicketCard from "../components/TicketCard";

export default class TicketsList extends Component {
  static navigationOptions = {
    title: 'Заявки',
  };

  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.fetchTickets();
      }
    );
  }

  fetchTickets() {
    this.setState({refreshing: true});
    axios.get('tickets')
      .then(response => {
        this.setState({tickets: response.data.data});
        this.setState({refreshing: false});
      });
  }


  renderTicket(item) {
    return (
      <TicketCard ticket={item} key={item.id}>
      </TicketCard>
    );
  }

  _onRefresh = () => {
    this.fetchTickets();
  };

  render() {
    const data = this.state.tickets;
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        {data.map(item => this.renderTicket(item))}
      </ScrollView>
    );
  }
}