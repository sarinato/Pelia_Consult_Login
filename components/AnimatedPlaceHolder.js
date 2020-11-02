import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated';  
import {LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT}  from "../Constants"
import { interpolateColor, translate } from 'react-native-redash';
import {Ionicons as Icon} from "@expo/vector-icons"

const AnimatedPlaceHolder = ({isOpenAnimation}) => {

    const translateX = interpolate(isOpenAnimation, {
        inputRange : [0, 1],
        outputRange : [80,0]
    })
    
    const translateY = interpolate(isOpenAnimation, {
        inputRange : [0, 0.5, 1],
        outputRange : [0, 0, -60]
    })  

    const opacity = interpolate(translateY , {
        inputRange : [-60, 0],
        outputRange : [1, 0]
    })  
    return(
        <Animated.Text style={{...styles.placeHolder, transform: [{translateX,translateY} ],opacity }}>
            <Text>Enter your mobile number</Text>
        </Animated.Text>
    )    
}

export default AnimatedPlaceHolder;

const styles = StyleSheet.create({
    placeHolder:{
        fontSize: 24,
        position: "absolute",
        opacity: 0
    }    
})
