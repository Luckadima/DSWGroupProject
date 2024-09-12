import { Text, View , StyleSheet, Image, Pressable, TextInput, Linking} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { router } from 'expo-router';
import { ImageBackground } from "react-native";
import CheckBox from "react-native-check-box";

function Login() {

      const [showPassword, setShowPassword] = useState(false);
      const [isChecked, setIsChecked] = useState(false);
  
      const toggleShowPassword = () => {
          setShowPassword(!showPassword);
      };



    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const [studentNumber, setStudentNumber] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        let isValid = true;

        if (studentNumber.length !== 9) {
            setError('Student number must be 9 digits long.');
          } else if (studentNumber !== '223006213') {
            setError('Student number is incorrect.');
          }else {
            setError(''); // Clear error if both validations pass
          }
          
          if (password.length !== 10) {
            setErrors('Password must be 10 characters long.');
          } else {
            setErrors(''); // Clear error if both validations pass
          }

          if (isValid) {
            // If both studentNumber and password are valid, navigate to Landingpage
            router.push("/Landingpage");
          }

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
                                                    placeholderTextColor="#aaa"
                                                    keyboardType="numeric"
                                                    value={studentNumber}
                                                    onChangeText={(text) => setStudentNumber(text)}>
                                                    
                                                    
                                        </TextInput>
                                        {error ? <Text style={{ color: 'red', marginTop: '40%', marginLeft:'-78%' }}>{error}</Text> : null}
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
                                        keyboardType="text"
                                        /> 
                                        <MaterialCommunityIcons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={15}
                                        color="#aaa"
                                        style={styles.icon}
                                        onPress={toggleShowPassword}
                                        />
                                        {errors ? <Text style={{ color: 'red', marginTop: '10%', marginLeft:'-83%' }}>{errors}</Text> : null}
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


                        <Pressable  style={{backgroundColor: 'black', width: 100, marginLeft: '35%', height: 30,borderRadius: 99, marginTop:'10%'}}>
                            <Text onPress={validateInput} style={{fontSize: 17, color: 'white', marginLeft:'25%',fontWeight:'bold', marginTop:'5%' }}>LOGIN</Text>
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