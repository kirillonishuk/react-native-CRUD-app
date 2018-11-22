import React, { Component } from 'react'
import { Modal, View, Button, Text, StyleSheet } from 'react-native';

export default class СonfirmModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.display}
                animationType="slide"
                onRequestClose={() => {}}
                transparent={true}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000080'
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.text}>{this.props.text || 'Good'}</Text>
                        <Button title='Ок' onPress={() => this.props.closeModal()} />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        width: 200,
        height: 150
    },
    text: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10
    }
})