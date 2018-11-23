import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  Button
} from 'react-native';
import { ImagePicker } from 'expo';

import ColorPalette from 'react-native-color-palette';
import Icon from 'react-native-vector-icons/Ionicons';

import defaultImage from './static/image';
import fetchFoundation from './api/apiFetch';
import СonfirmModal from './confirmModal';

export default class CreateProductScreen extends Component {
  state = {
    name: '',
    cost: '',
    description: '',
    image: null,
    animating: 0,
    showModal: false,
    color: '#4a76a8',
    status: ''
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({
        image: result.base64
      })
    }
  }


  sendProduct = () => {
    if (this.state.name &&
      this.state.cost &&
      this.state.description) {
      this.setState({
        animating: this.state.animating + 1
      })
      fetchFoundation({
        path: 'products',
        method: 'POST',
        body: {
          name: this.state.name,
          color: this.state.color,
          cost: parseInt(this.state.cost),
          description: this.state.description,
          image: this.state.image || defaultImage
        }
      })
        .then(res => {
          if (res._id)
            this.setState({
              status: 'Еда добавлена.',
              showModal: true
            })
          else this.setState({
            status: 'Ошибка добавления.',
            showModal: true
          })
        },
          error => {
            this.setState({
              status: 'Ошибка',
              showModal: true
            })
          })
        .finally(() => {
          this.setState({
            animating: this.state.animating - 1,
            name: '',
            cost: '',
            description: '',
            image: '',
            color: '#4a76a8'
          })
        })
    }
  }


  render() {

    const disabled = !(this.state.name && this.state.cost &&
      this.state.description);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.screen}
        >
          <Text style={styles.title}>Добавление Еды</Text>
          <TextInput
            style={styles.inputDefault}
            underlineColorAndroid="transparent"
            placeholder="Название еды"
            placeholderTextColor="#aeaeae94"
            autoCorrect={true}
            selectionColor="orange"
            autoCapitalize="words"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            style={styles.inputDefault}
            underlineColorAndroid="transparent"
            placeholder="Цена в $"
            placeholderTextColor="#aeaeae94"
            selectionColor="orange"
            keyboardType="numeric"
            value={this.state.cost}
            onChangeText={cost => this.setState({ cost })}
          />
          <TextInput
            style={styles.inputDefault}
            underlineColorAndroid="transparent"
            placeholder="Описание"
            placeholderTextColor="#aeaeae94"
            autoCorrect={true}
            selectionColor="orange"
            maxLength={100}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
          <Text style={styles.descLen}>{`${this.state.description.length}/100`}</Text>
          <ColorPalette
            onChange={color => this.setState({ color })}
            defaultColor={this.state.color}
            colors={['#4a76a8', '#00FF7F', '#9B59B6', '#808080', '#F4A460', '#FF1493', '#6A5ACD']}
            title={" "}
            icon={<Icon name="ios-checkmark" color={'orange'} size={36} />}
          />
          <View style={[{ width: "85%", borderRadius: 10, marginTop: 15 }]}>
            <Button
              onPress={this.pickImage}
              color='orange'
              title={!this.state.image ? `Выбрать изображение` : 'Изменить изображение'}
            />
          </View>
          <Image
            source={{ uri: `data:image/png;base64,${this.state.image || defaultImage}` }}
            style={styles.image}
          />
          <View style={[{ width: "85%", borderRadius: 10, marginTop: 15 }]}>
            <Button
              disabled={disabled}
              onPress={this.sendProduct}
              color='orange'
              title='Добавить'
            />
          </View>
        </ScrollView>
        {this.state.animating > 0 ? <ActivityIndicator
          animating={true}
          color="#6b52ae95"
          size={50}
          style={styles.spinner}
        /> : null}
        <СonfirmModal
          text={this.state.status}
          closeModal={this.closeModal}
          display={this.state.showModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    marginTop: 25,
    fontWeight: '100',
    fontSize: 20,
    marginBottom: 15,
    color: '#aeaeae'
  },
  inputDefault: {
    marginTop: 12,
    width: '85%',
    borderBottomColor: '#aeaeae94',
    borderBottomWidth: 1,
    borderLeftColor: '#aeaeae94',
    borderLeftWidth: 1,
    paddingHorizontal: 5
  },
  descLen: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 15,
    color: '#aeaeae',
    fontWeight: '100',
    fontSize: 12,
    opacity: 0.7
  },
  gradient1: {
    marginTop: 12,
    width: '85%',
    height: 4
  },
  gradient2: {
    marginTop: 30,
    width: '85%',
    height: 4
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  image: {
    marginTop: 10,
    alignSelf: 'center',
    width: '44%',
    height: 150,
    borderRadius: 5
  },
  submit: {
    width: '85%',
    marginTop: 15,
    fontWeight: '500',
    borderRadius: 5
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