import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';

import Product from './product';

import fetchFoundation from './api/apiFetch';

export default class ProductListScreen extends Component {
  state = {
    list: [],
    refreshing: false
  }

  componentDidMount = () => {
    this.fetchList();
  }

  onDelete = (id) => {
    this.setState({
      refreshing: true
    })
    fetchFoundation({
      path: 'products',
      method: 'DELETE',
      id
    })
      .then(
        response => {
          this.fetchList()
        },
        error => {
          console.error(error)
        }
      )
  }

  onEdit = ({ id, name, cost, description }) => {
    this.setState({
      refreshing: true
    })
    fetchFoundation({
      path: 'products',
      method: 'PATCH',
      id,
      body: {
        name, cost,
        description
      }
    })
      .then(
        response => {
          this.fetchList()
        },
        error => {
          console.error(error)
        }
      )
  }

  onRefresh = () => {
    this.fetchList()
  }

  fetchList = () => {
    this.setState({
      refreshing: true
    })
    fetchFoundation({
      path: 'products',
      method: 'GET'
    })
      .then(
        response => {
          this.setState({
            list: response
          }, () => this.setState({
            refreshing: false
          }))
        },
        error => {
          console.error(error)
        }
      )
  }

  render() {

    return (
      <View style={styles.screen}>
        <FlatList
          data={this.state.list}
          renderItem={props => <Product {...props.item} onDelete={this.onDelete} onEdit={this.onEdit} />}
          horizontal={false}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          numColumns={2}
          keyExtractor={(props, id) => id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f2f2f2',
    borderRadius: 8
  }
});