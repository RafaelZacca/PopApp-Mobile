import React, { Component } from 'react'
import { Platform, TouchableNativeFeedback, TouchableHighlight, StyleSheet } from 'react-native'

export const ButtonControl = (props) => {
    return Platform.OS === 'android'
        ? <TouchableNativeFeedback onPress={props.onPress} style={styles.button} >{props.children}</TouchableNativeFeedback>
        : <TouchableHighlight onPress={props.onPress} style={styles.button}>{props.children}</TouchableHighlight>
}

const styles = StyleSheet.create({
    button: {
        flex: 1
    }
});