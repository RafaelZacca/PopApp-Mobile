import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';

export const BouncingUpControl = (props) => {
    const [bouncingAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                bouncingAnim,
                {
                    toValue: 10,
                    easing: Easing.inOut(Easing.cubic),
                    duration: 2000,
                }
                ),
            Animated.timing(
                bouncingAnim,
                {
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