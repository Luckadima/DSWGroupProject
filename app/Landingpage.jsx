import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet , Animated, TouchableOpacity} from "react-native";
import { useRef } from "react";
import { useEffect } from "react";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

function Landingpage() {
    const Homepage = () => {
        router.push('/Homepage');
    }
    // Create an animated value for opacity
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      // Define the animation
      Animated.timing(fadeAnim, {
        toValue: 1,      // Fade to fully visible
        duration: 3000, // Duration of the animation (2000 ms = 2 seconds)
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }, [fadeAnim]);
  
    return (
        <>
        <LinearGradient colors={['#FF4500', '#A9A9A9', '#000000']} style={styles.gradient}>
            <View style={styles.container}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                WELLCOME
            </Animated.Text>
            </View>

            <AntDesign style={{marginLeft: '90%', marginTop: '-6%'}} name="menufold" size={24} color="black" />

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'gray', width:"44%",height:'13%', borderRadius: 5, marginTop:'40%', marginLeft:'4%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <TouchableOpacity onPress={Homepage}>
                    <Text style={{marginLeft: '25%', marginTop: '25%',}}>Tap To Enter</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'gray', width:"45%",height:'13%', borderRadius: 5, marginTop:'-23%', marginLeft:'50%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <TouchableOpacity>
                    <Text style={{marginLeft: '37%', marginTop: '25%'}}>Scan</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'gray', width:"44%",height:'13%', borderRadius: 5, marginTop:'10%', marginLeft:'4%', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <TouchableOpacity>
                    <Text style={{marginLeft: '37%', marginTop: '25%'}}>Details</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'gray', width:"45%",height:'13%', borderRadius: 5, marginTop:'-23%', marginLeft:'50%', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <TouchableOpacity>
                    <Text style={{marginLeft: '37%', marginTop: '25%'}}>TimeTable</Text>
                </TouchableOpacity>
            </Animated.View>

            







        </LinearGradient>


      </>
    );
  }
  
  const styles = StyleSheet.create({
    gradient: {
      height: '100%',
    },
    container: {
        marginTop:'10%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  
  export default Landingpage;