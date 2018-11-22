import React, { Component } from 'react'
import { Modal, View, Button, Text, StyleSheet, TextInput } from 'react-native';

export default class DeleteModal extends Component {

    state = {
        ...this.props
    }

    render() {
        const deleteOptions = {
            id: this.props._id,
            name: this.state.name,
            cost: this.state.cost,
            description: this.state.description
        }
        return (
            <Modal
                visible={this.props.display}
                animationType="slide"
                onRequestClose={() => { }}
                transparent={true}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000080'
                }}>
                    <View style={styles.screen}>
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
                            value={`${this.state.cost}`}
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
                        <Text style={styles.text}>{this.props.text || 'Удалить выбранную еду?'}</Text>
                        <View style={{ width: '75%', marginTop: 15 }}>
                            <Button title='Изменить' onPress={() => this.props.onEdit(deleteOptions)} />
                        </View>
                        <View style={{ width: '75%', marginTop: 15 }}>
                            <Button title='Удалить' onPress={() => this.props.onDelete()} />
                        </View>
                        <View style={{ width: '75%', marginTop: 15, marginBottom: 15 }}>
                            <Button title='Отмена' onPress={() => this.props.closeModal()} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#FFF',
        borderWidth: 1
    },
    text: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10
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
})