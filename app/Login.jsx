import { Text, View , StyleSheet, Image, Pressable, TextInput, Linking} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { router } from 'expo-router';

function Login() {

    const Homepage = () => {
        router.push("/Homepage")
      };



    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [isSelected, setSelection] = useState(false);

    return(
        <>

            <LinearGradient 
                colors={['#ffffff', '#000000']} 
                style={{backgroundColor: 'red', flex: 1, alignItems: 'center', justifyContent: 'center', }}>


                <View style={{backgroundColor: 'white', borderRadius: 10, width: '80%', height: '80%',}}>

                        <Image 
                            style={{width: '100%', 
                                    height: 80, 
                                    borderRadius: 9}} 
                                    source={{uri:'https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg'}}></Image>

                        <Text style={{marginLeft: '35%', marginBottom: '30%', fontSize:'20%'}}>Welcome</Text>
                        <Text style={{marginLeft: '22%', marginTop: '-28%', fontSize:'10%'}}>Please enter your details to sign in.</Text>

                        <Pressable onPress={() => Linking.openURL('https://www.icloud.com/')}
                            style={{flexDirection:'row', 
                                    gap: 50, 
                                    marginLeft: 10, 
                                    marginTop: 20, 
                                    backgroundColor: 'whitesmoke', 
                                    width: 90, 
                                    height: 40, 
                                    borderRadius: 10, 
                                    alignContent:'center', 
                                    alignItems:'center', 
                                    justifyContent: 'center' }} >
                            <AntDesign source={{uri:'https://www.icloud.com/'}} name="apple1" size={24} color="black"  />
                        </Pressable>

                        <Pressable onPress={() => Linking.openURL('')}
                            style={{flexDirection:'row', 
                                    gap: 50,
                                    marginLeft: 120, 
                                    marginTop: -40, 
                                    backgroundColor: 'whitesmoke', 
                                    width: 90, 
                                    height: 40, 
                                    borderRadius: 10, 
                                    alignContent:'center', 
                                    alignItems:'center', 
                                    justifyContent: 'center' }}>
                        <AntDesign name="google" size={24} color="black" />
                        </Pressable>

                        <Pressable onPress={() => Linking.openURL('https://www.facebook.com/?_rdr')}
                            style={{flexDirection:'row', 
                                    gap: 50, 
                                    marginLeft: 230, 
                                    marginTop: -40, 
                                    backgroundColor: 'whitesmoke', 
                                    width: 90, height: 40, 
                                    borderRadius: 10, 
                                    alignContent:'center', 
                                    alignItems:'center', 
                                    justifyContent: 'center' }}>
                        <Entypo name="facebook" size={24} color="black" />
                        </Pressable>

                        <Text style={{marginTop:20, fontSize: 10}} numberOfLines={1}>               
                        _____________________________OR___________________________
                        </Text>

                        <View style={{flexDirection:'column'}}>
                        <Text style={{marginLeft: 20, marginTop:30}}>Student Name</Text>
                        <TextInput 
                            style={{paddingHorizontal: 14,
                                    width: '89%', 
                                    backgroundColor: '#f3f3f3', 
                                    borderRadius: 8, 
                                    justifyContent:'center',
                                    marginLeft: 20, 
                                    height: 35,
                                    marginTop: 5, }} 
                                    placeholder="As it appears on your student card" 
                                    placeholderTextColor={'lightgray'}>
                        </TextInput>
                        </View>



                        <Text style={{marginLeft: 20}}>Student Number</Text>
                        <View style={styles.container}>
                            <TextInput
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholder="Enter your student number"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            />
                            <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#aaa"
                            style={styles.icon}
                            onPress={toggleShowPassword}
                            />
                        </View>

                        <View style={{flexDirection:'row', marginTop: 20, marginLeft: 20}}>
                        </View>
                        <Text  style={{marginLeft: 115, marginBottom: 100, textDecorationLine:'underline'}}>forget password?</Text>
                        

                        <Pressable onPress={Homepage} style={{backgroundColor: 'black', width: 300, marginLeft: 20, height: 50,borderRadius: 10, marginTop: -40}}>
                            <Text style={{fontSize: 15, color: 'white',marginLeft: 120, marginTop: 15}}>Sign in</Text>
                        </Pressable>

                        <Text style={{marginLeft: 80, marginTop: 35}}>Don't have an account yet?</Text>

                        
                        
                </View>

            </LinearGradient>

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
    containers: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
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
        marginLeft: 10,
    },

});


export default Login