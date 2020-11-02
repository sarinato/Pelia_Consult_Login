import React,{useRef} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Logo from "./components/Logo"
import Animated, { useCode, cond, eq, set, interpolate, SpringUtils } from 'react-native-reanimated';
import { withTimingTransition, onGestureEvent, withSpringTransition } from 'react-native-redash';
import {SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT} from "./Constants";
import { TextInput, TapGestureHandler, State } from 'react-native-gesture-handler';
import Overlay from './components/Overlay';
import HeaderBackArrow from './components/HeaderBackArrow';
import AnimatedPlaceHolder from './components/AnimatedPlaceHolder';

export default function App() {

  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current)
  
  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0,1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0]
  })

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED))
  const gestureHandler = onGestureEvent({state: gestureState.current})

  const arrowGestureState = useRef(new Animated.Value(State.UNDETERMINED))
  const arrowGestureHandler = onGestureEvent({state: arrowGestureState.current})

  const isOpen = useRef(new Animated.Value(0));
  const isOpenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20)
  })

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0,1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2]
  })

  const headingOpacity = interpolate(isOpenAnimation, {
    inputRange : [0,1],
    outputRange : [1,0],
  })

  useCode(()=> 
    cond(eq(arrowGestureState.current, State.END), [
        set(gestureState.current , State.UNDETERMINED),
        set(isOpen.current, 0),
    ]),
    [arrowGestureState.current],
  );

  useCode(()=> 
    cond(eq(gestureState.current, State.END), [
        cond(eq(isOpen.current, 0), set(isOpen.current, 1))
    ],[gestureState.current]),
  );
  useCode(()=> cond(eq(scale.current, 0), set(scale.current, 1)), [])

  return (
    <View style={styles.container}>      
      <View style={{...styles.logoContainer}}>
        <Logo scale={scaleAnimation}/>
      </View>
      <HeaderBackArrow isOpenAnimation={isOpenAnimation} gestureHandler={{...arrowGestureHandler}} />
      <Animated.View style={{
          backgroundColor:"white",
          ...StyleSheet.absoluteFill, 
          transform:[{translateY: outerLoginY}]         
        }}>
        
        <Overlay isOpenAnimation={isOpenAnimation}/>
        <Animated.View>
          <Animated.View
            style={{
              height:LOGIN_VIEW_HEIGHT,        
              backgroundColor:"white",
              transform:[{translateY: innerLoginY}],
            }}
          >            
            <Animated.View style={{...styles.heading , opacity: headingOpacity}}>
              <Text style={{fontSize: 24}}>
                  Get moving with Pelia
              </Text>
            </Animated.View>

            <TapGestureHandler {...gestureHandler} >
              <Animated.View>
                <Animated.View pointerEvents={"none"} style={{flexDirection:"row", margin:25}}>
                  <Image 
                    source={require("./assets/morocco.png")}
                    style={{width:34,height:34, resizeMode:"contain"}}
                  />
                  <AnimatedPlaceHolder  isOpenAnimation={isOpenAnimation}/>
                  <Animated.View style={{flexDirection:"row"}}>
                    <Text style={{paddingHorizontal:10,fontSize:20}}>+212</Text>
                    <TextInput keyboardType="number-pad" placeholder="Enter your number"/>
                  </Animated.View>
                </Animated.View>
              </Animated.View>              
            </TapGestureHandler>            
           
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2289d6',
  },
  logoContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  heading:{
    alignItems:'flex-start',
    marginHorizontal:25,
    marginTop:50,
  }
});
