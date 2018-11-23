import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import defaultImage from './static/image';
import DeleteModal from './deleteModal';

export default class CreateProductScreen extends Component {

  state = {
    showModal: false
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { this.setState({ showModal: true }) }} >
        <View style={styles.view} >
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{ uri: `data:image/png;base64,${this.props.image || defaultImage}` }}
          />
          <Text style={styles.title} >
            {this.props.name}
          </Text>
          <View style={styles.properties} >
            <Text style={[styles.cost, { color: this.props.color }]} >
              {`${this.props.cost}$`}
            </Text>
            <Text style={[styles.description, { color: this.props.color }]} >
              {this.props.description}
            </Text>
          </View>
          <DeleteModal
            name={this.props.name}
            cost={this.props.cost}
            description={this.props.description}
            _id={this.props._id}
            onEdit={(options) => { this.props.onEdit(options); this.closeModal() }}
            onDelete={() => { this.props.onDelete(this.props._id); this.closeModal() }}
            closeModal={this.closeModal}
            display={this.state.showModal}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    width: '44%',
    minWidth: 150,
    minHeight: 200,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    elevation: 5,
    position: 'relative'
  },
  image: {
    width: 'auto',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
    backgroundColor: '#f2f2f2'
  },
  title: {
    marginLeft: '12.5%',
    maxWidth: '75%',
    width: '100%',
    height: 150,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 22,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 20,
    textShadowColor: '#000000',
    top: '8%',
    color: '#FFFFFF',
    fontWeight: '500'
  },
  properties: {
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cost: {
    fontSize: 19,
    color: '#7d3f87',
    marginLeft: 7,
    fontWeight: '500',
    maxWidth: '45%'
  },
  description: {
    height: 'auto',
    fontSize: 10,
    color: '#7d3f87',
    marginRight: 7,
    textAlign: 'right',
    fontWeight: '100',
    letterSpacing: -0.5,
    maxWidth: '55%',
    lineHeight: 10
  }
});