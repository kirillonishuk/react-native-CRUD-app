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
import {
  HueSlider,
  SaturationSlider,
  LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';
import { ImagePicker } from 'expo';

import defaultImage from './static/image';
import fetchFoundation from './api/apiFetch';
import СonfirmModal from './confirmModal';

export default class CreateProductScreen extends Component {
  state = {
    name: '',
    cost: '',
    description: '',
    image: null,
    color: {
      h: 0,
      s: 0,
      l: 0
    },
    animating: 0,
    showModal: false,
    status: ''
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  changeColorH = (h) => {
    this.setState({
      color: {
        ...this.state.color, h
      }
    })
  }

  changeColorS = (s) => {
    this.setState({
      color: {
        ...this.state.color, s
      }
    })
  }

  changeColorL = (l) => {
    this.setState({
      color: {
        ...this.state.color, l
      }
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
          color: tinycolor(this.state.color).toHexString(),
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
            color: {
              h: 0,
              s: 0,
              l: 0
            }
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
          <HueSlider
            style={styles.gradient1}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.changeColorH}
          />
          <SaturationSlider
            style={styles.gradient2}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.changeColorS}
          />
          <LightnessSlider
            style={styles.gradient2}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.changeColorL}
          />
          <View style={{
            marginTop: 30,
            alignSelf: 'center',
            width: 75,
            height: 20,
            marginBottom: 5,
            backgroundColor: tinycolor(this.state.color).toHexString(),
          }}></View>
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