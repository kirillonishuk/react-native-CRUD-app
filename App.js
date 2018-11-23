import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductListScreen from './src/list';
import CreateProductScreen from './src/create';


export default class App extends Component {

  componentDidMount = () => {
    StatusBar.setBackgroundColor('#f2f2f2', true);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#f2f2f2" hidden={true} />
        <BottomNavigator screenProps={{}} />
      </View>
    );
  }
}


const BottomNavigator = createMaterialTopTabNavigator({
  List: {
    screen: props => <ProductListScreen />,
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-list" color={tintColor} size={24} />
      )
    }
  },
  Create: {
    screen: props => <CreateProductScreen />,
    navigationOptions: {
      tabBarLabel: 'Add new',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-create" color={tintColor} size={24} />
      )
    }
  }
}, {
    initialRouteName: 'List',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      pressColor: '#aeaeae94',
      showIcon: true,
      indicatorStyle: {
        height: 0
      },
      style: {
        backgroundColor: '#f2f2f2'
      }
    }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
