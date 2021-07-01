import React, { ReactNode } from 'react'
import { Platform, TouchableNativeFeedback, TouchableHighlight, StyleSheet, GestureResponderEvent } from 'react-native'

interface ButtonControlProps {
    onPress: (event: GestureResponderEvent) => void,
    children: ReactNode
}

export const ButtonControl = (props: ButtonControlProps) => {
    return Platform.OS === 'android'
        ? <TouchableNativeFeedback onPress={props.onPress} style={styles.button} >{props.children}</TouchableNativeFeedback>
        : <TouchableHighlight onPress={props.onPress} style={styles.button}>{props.children}</TouchableHighlight>
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        zIndex: 2
    },
});