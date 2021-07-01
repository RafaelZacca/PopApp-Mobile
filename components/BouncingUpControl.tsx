import React, { ReactNode, useState } from 'react';
import { Animated, Easing } from 'react-native';

interface BouncingUpControlProps{
    style: any,
    children: ReactNode
}

export const BouncingUpControl = (props: BouncingUpControlProps) => {
    const [bouncingAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                bouncingAnim,
                {
                    useNativeDriver: false,
                    toValue: 10,
                    easing: Easing.inOut(Easing.cubic),
                    duration: 2000,
                }
                ),
            Animated.timing(
                bouncingAnim,
                {
                    useNativeDriver: false,
                    toValue: 0,
                    easing: Easing.inOut(Easing.cubic),
                    duration: 2000,
                }
            )])
        ).start();
    }, [])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                bottom: bouncingAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}