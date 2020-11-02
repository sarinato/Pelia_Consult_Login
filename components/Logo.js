import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import Animated from 'react-native-reanimated';    

const Logo = ({scale}) => {
    return(
        <Animated.View style={{...styles.logo, transform:[{scale: scale}]}}>
            <Text style={{fontWeight:"400", fontSize:36}}>Pelia</Text>
        </Animated.View>
    )    
}

export default Logo;

const styles = StyleSheet.create({
    logo:{
        backgroundColor:'white',
        height:120,
        width:120,
        padding:10,
        alignItems:"center",
        justifyContent:'center',
    }    
})
