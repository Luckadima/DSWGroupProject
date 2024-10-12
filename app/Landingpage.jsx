import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet , Animated, Pressable, ActivityIndicator} from "react-native";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

function Landingpage() {

    const Homepage = () => {
        router.push('/Homepage');
    }

    const Details = () => {
      router.push('/Details');
    }

    const QRcode = () => {
        router.push('/QRcode')
    }

    const Nfc = () => {
        router.push('/NFCcont')
    }

    const Servers = () => {
        router.push('/Server');
    }

    const Login = () => {
        router.push('/Login');
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


    // State to track whether the sidebar is visible or not
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    // Animated value for sidebar slide
    const slideAnim = useRef(new Animated.Value(-300)).current;  // Initial position off-screen
    
        // Function to toggle sidebar visibility
        const toggleSidebar = () => {
          setSidebarVisible(!isSidebarVisible);
  
          // Slide in or out animation for the sidebar
          Animated.timing(slideAnim, {
              toValue: isSidebarVisible ? 0 : -300,  // Slide in or out
              duration: 300,
              useNativeDriver: true,
          }).start();
      };


    // State for weather data
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    
    const apiKey = 'a8f0979eda1d5bb3bb19b35e8e30cd6e';
    const city = 'Johannesburg';
    
    useEffect(() => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setWeather(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setError(err);
          setLoading(false);
        });
    }, [city, apiKey]);
    
    const toggleDetails = () => {
      setDetailsVisible(!detailsVisible);
    };

    //first can a state
    // const [newtext, setnewtext] = useState("");

    // //this is how you add extre text to sentences
    // const hnadletext = () => {
    //     const texts =  ["luke , kadima"];
    //     setnewtext(texts[0]);
         
    //   }

    const TimeTable = () => {
      router.push('/Timetable')
    }


    return (
        <>
        <LinearGradient colors={['#FF4500', '#A9A9A9', '#000000']} style={styles.gradient}>
            <View style={styles.container}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                WELLCOME
            </Animated.Text>
            </View>

                {/* Menufold button to toggle sidebar */}
                <AntDesign 
                    style={{ marginLeft: '90%', marginTop: '-6%' }} 
                    name="menufold" 
                    size={24} 
                    color="black" 
                    onPress={toggleSidebar} // Trigger the toggle function on press
                />

                {/* Weather API data */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                    ) : error ? (
                    <Text style={styles.errorText}>Error: {error.message}</Text>
                    ) : (
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Pressable onPress={toggleDetails}>
                        <View style={{ flexDirection: 'row', gap: 10, marginLeft: "15%" }}>
                            <Text style={{fontSize: 18,fontWeight: '400'}}>{weather.name}</Text>
                            <Text style={{fontSize: 18,fontWeight: '400'}}>Temperature: {Math.round(weather.main.temp - 273.15)}°C</Text>
                        </View>
                        </Pressable>

                        {detailsVisible && (
                        <>
                            <Text style={styles.weatherText}>Weather: {weather.weather[0].description}</Text>
                            <Text style={styles.weatherText}>Humidity: {weather.main.humidity}%</Text>
                            <Text style={styles.weatherText}>Wind Speed: {weather.wind.speed} m/s</Text>
                        </>
                        )}
                    </Animated.View>
                    )}


                {/* Sidebar that appears on pressing menufold */}
                <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>

                    <Entypo style={{marginBottom: '-25%' }} name="bar-graph" size={24} color="white" />
                    <Text style={styles.sidebarText}>Your activity</Text>
                    <AntDesign style={{marginBottom: '-25%' }} name="setting" size={24} color="white" />
                    <Text style={styles.sidebarText}>Settings</Text>
                    <AntDesign style={{marginBottom: '-25%' }} name="profile" size={24} color="white" />
                    <Text style={styles.sidebarText}>Account</Text>
                    <AntDesign style={{marginBottom: '-25%' }} name="question" size={24} color="white" />
                    <Text style={styles.sidebarText}>About</Text>
                    <AntDesign style={{marginBottom: '-25%' }} name="logout" size={24} color="white" />
                    <Text onPress={Login} style={styles.sidebarText}>Logout</Text>
                </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'black', width:"44%",height:'13%', borderRadius: 5, marginTop:'40%', marginLeft:'4%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <Pressable onPress={Homepage}>
                    <Text style={{marginLeft: '25%', marginTop: '25%', color:"white"}}>Tap To Enter</Text>
                </Pressable>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'black', width:"45%",height:'13%', borderRadius: 5, marginTop:'-23%', marginLeft:'50%',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <Pressable onPress={QRcode}>
                    <Text style={{marginLeft: '37%', marginTop: '25%', color:"white"}}>Scan</Text>
                </Pressable>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'black', width:"44%",height:'13%', borderRadius: 5, marginTop:'10%', marginLeft:'4%', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <Pressable onPress={Details} >
                    <Text style={{marginLeft: '37%', marginTop: '25%', color:"white"}}>Details</Text>
                </Pressable>
            </Animated.View>

            <Animated.View style={{opacity: fadeAnim ,backgroundColor:'black', width:"45%",height:'13%', borderRadius: 5, marginTop:'-23%', marginLeft:'50%', shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,shadowRadius: 3,elevation: 5,}}>
                <Pressable onPress={TimeTable}>
                    <Text style={{marginLeft: '37%', marginTop: '25%', color:"white"}}>TimeTable</Text>
                </Pressable>
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
    sidebar: {
      position: 'absolute',
      left: 0,
      top: 18,
      bottom: 0,
      width: 250,
      backgroundColor: 'black',
      zIndex: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
  },
  sidebarText: {
      color: 'white',
      fontSize: 18,
      padding: 30
  },
  weatherText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    gap: 0,
    marginLeft: '30%'
  },
  errorText: {
    color: 'red',
  },
  });
  
  export default Landingpage;