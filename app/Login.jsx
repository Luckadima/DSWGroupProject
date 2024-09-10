import { Text, View , StyleSheet, Image, Pressable, TextInput, Linking} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { router } from 'expo-router';
import { ImageBackground } from "react-native";
import CheckBox from "react-native-check-box";

function Login() {

      const Landingpage = () => {
        router.push("/Landingpage")

      };



    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return(
        <>

            <ImageBackground style={{backgroundColor: 'red', flex: 1, alignItems: 'center', justifyContent: 'center', }} 
                            source= {require('../assets/images/background-images.jpg')} >


                <View style={{backgroundColor: 'white', borderRadius: 10, width: '85%', height: '70%',}} >

                        <Image 
                            style={{width: '100%', 
                                    height: 80, 
                                    borderTopLeftRadius: 9,
                                    borderTopRightRadius: 9}} 
                                    source= {require('../assets/images/login picture.jpg')}></Image>


                        
                                <View style={{flexDirection: 'row', marginBottom: '20%'}}>
                                     <Fontisto style={{marginTop:'33%', marginLeft: '10%'}} name="locked" size={15} color="black" />
                                        <Text style={{marginTop: '23%', marginLeft:'5%'}}>Login ID</Text>
                                        <TextInput 
                                        
                                            style={{paddingHorizontal: 14,
                                                    width: '79%', 
                                                    backgroundColor: '#f3f3f3', 
                                                    borderRadius: 8, 
                                                    justifyContent:'center',
                                                    marginLeft: '-18%', 
                                                    height: 35,
                                                    marginTop:'30%', }} 
                                                    placeholder="Enter your student number" 
                                                    placeholderTextColor="#aaa">
                                                    
                                                    
                                        </TextInput>
                                </View>



                            <View style={{flexDirection: 'row', marginBottom: '10%'}}>
                                    <Fontisto style={{marginTop:'3%', marginLeft: '10%'}} name="locked" size={15} color="black" />
                                    <Text style={{marginTop: '-8%', marginLeft:'5%'}}>Password</Text>
                                        <TextInput
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                        style={{paddingHorizontal: 14,
                                                    width: '79%', 
                                                    backgroundColor: '#f3f3f3', 
                                                    borderRadius: 8, 
                                                    justifyContent:'center',
                                                    marginLeft: '-22%', 
                                                    height: 35,
                                                    marginBottom:'-10%', 
                                                    }}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#aaa"
                                        keyboardType="numeric"
                                        /> 
                                        <MaterialCommunityIcons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={15}
                                        color="#aaa"
                                        style={styles.icon}
                                        onPress={toggleShowPassword}
                                        />
                            </View>

                        <View style={{flexDirection:'row', marginTop: 40, marginLeft: 20}}>
                        </View>
                        <Text  style={{marginLeft: '60%', marginBottom: '20%', textDecorationLine:'underline'}}>forget password?</Text>

                        <View style={{marginTop: '-28%'}}>
                            <CheckBox style={{ padding: 10 }}
                                    onClick={() => setIsChecked(!isChecked)}
                                    isChecked={isChecked}
                                    rightText={"Remember me"} />
                        </View>


                        <Pressable onPress={Landingpage} style={{backgroundColor: 'black', width: 100, marginLeft: '35%', height: 30,borderRadius: 99, marginTop:'10%'}}>
                            <Text style={{fontSize: 17, color: 'white', marginLeft:'25%',fontWeight:'bold', marginTop:'5%' }}>LOGIN</Text>
                        </Pressable>


                        
                        
                </View>

            </ImageBackground>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginTop: 5,
        width: 295,
        height: 34,
        marginLeft: 20
            },
    checkboxContainer: {
            flexDirection: 'row',
            marginBottom: -25,
        },
    checkbox: {
            alignSelf: 'center',
        },
    label: {
            margin: 8,
        },
    input: {
        flex: 1,
        color: 'lihtgray',
        paddingVertical: 10,
        paddingRight: 10,
        fontSize: 13,
    },
    icon: {
        marginLeft: 5,
        marginTop: '3%'
    },

});


export default Login