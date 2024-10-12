import { Text, View , StyleSheet, Image, Pressable, TextInput, Modal, Button,} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from 'expo-router';
import { ImageBackground } from "react-native";
import { firebase_auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from  "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

import { usercontext } from './Context';
import { useContext } from "react";




function Login() {

    //this for send info next to studentcard
    const [name, setname] = useState('');
    const [studentnumber, setstudentnumber] = useState('');

    //this for the signup section
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    //this for the sign in section
    const [newpassword, newsetpassword] = useState('');
    const [newemail,  newsetemail] = useState('');
    


    const auth = firebase_auth;

    const { setuser } = useContext(usercontext);
    const { setusers } = useContext(usercontext);


    const handlesend = () => {
        setuser(name);
        setusers(studentnumber);
      }

      const Signin = async () => {
        try {
            const response = await signInWithEmailAndPassword(firebase_auth, newemail, newpassword);
            console.log(response);

            router.push('./Landingpage');
        } catch (error) {
            console.log(error);
            alert('Sign-in has failed: ' + error.message);
        } 
    };

    const Admin = () => {
        router.push('/AdminLogin');
    }

    ///
    const Signup = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
    
            // After user is created, add user data to Firestore
            const userId = response.user.uid; // Get the user ID from the response
            await setDoc(doc(db, "users", userId), {
                name: name,
                studentNumber: studentnumber,
                email: email,
            });
    
            handlesend();
            router.push('./Login');
    
        } catch (error) {
            console.log(error);
            alert('Sign-up has failed: ' + error.message);
        }
    };
    
    ///
      const [showPassword, setShowPassword] = useState(false);
  
      const toggleShowPassword = () => {
          setShowPassword(!showPassword);
      };
    ///

        const [modalVisible, setModalVisible] = useState(false);

        //for adminLogin
        const [newmodalVisible, newsetmodalVisible] = useState(false);
        const [ adname , setadname ] = useState('');
        const [ adpassword , setadpassword ] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const router = useRouter(); 

        const Admins = () => {
               
        // Check if the name or password is 'admin'
        if (adname.toLowerCase() !== 'admin' && adpassword !== 'admin') {
            // Set the error message
            setErrorMessage('Invalid admin credentials. Please try again.');
        } else {
            // Proceed with admin logic if credentials are correct
            console.log("Admin access granted");
            // Reset the input fields
            setadname('');
            setadpassword('');
            setErrorMessage(''); // Clear error message if credentials are valid
            router.push('/AdminLogin');
        }

    };
   

    // const NFC = () => {
    //     router.push("/NFCcont")
    // };



    return(
        <>

            <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', }} 
                            source= {require('../assets/images/background-images.jpg')} >

            {/* this is the new stuff  for sigin up*/}


            <View>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10,  marginLeft:'25%'}}>Enter credentials</Text>
                        </View>

                <View>
                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Initials & Surname</Text>
                    <TextInput value={name} onChangeText={(text) => setname(text)} style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'8%'}}>
                    </TextInput>

                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Student Number</Text>
                    <TextInput value={studentnumber} onChangeText={(text) => setstudentnumber(text)}  style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'8%'}}>
                        </TextInput>

                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Email</Text>
                    <TextInput value={email} onChangeText={(text) => setemail(text)} style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'8%'}}>
                        </TextInput>

                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Password</Text>
                    <TextInput secureTextEntry={true} value={password} onChangeText={(text) => setpassword(text)} style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'8%'}}>
                        </TextInput>



                </View>
                    <Button title="Save" onPress={() => { Signup();setModalVisible(false)  }}/>
                </View>
            </Modal>
        </View>

        {/* ends here */}



        {/* for admin */}

        <View>
                <Modal animationType="slide" transparent={true} visible={newmodalVisible} onRequestClose={() => newsetmodalVisible(false)}>
                    <View style={styles.modalView}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10,  marginLeft:'25%'}}>Enter AdminInfo</Text>
                        </View>

                <View>
                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Name</Text>
                    <TextInput value={adname} onChangeText={(text) => setadname(text)} style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'15%'}}>
                    </TextInput>


                    <Text style={{marginLeft: '15%', marginTop:'10%'}}>Password</Text>
                    <TextInput  value={adpassword} onChangeText={(text) => setadpassword(text)} style={{borderBlockColor: 'gray', 
                                        borderWidth: 2, 
                                        width: "70%", 
                                        marginLeft: "15%", 
                                        marginTop:'1%', 
                                        height:'15%'}}>
                        </TextInput>

                        {errorMessage ? (
                            <Text style={{marginLeft:'15%', marginTop: '5%', color:'red'}}>{errorMessage}</Text> // Display error message
                        ) : null}

                </View>
                    <Button title="Submit" onPress={() => { Admins(); newsetmodalVisible(false)  }}/>
                </View>
            </Modal>
        </View>



        {/* ends here */}


                <View style={{backgroundColor: 'white', borderRadius: 10, width: '85%', height: '80%',}} >

                        <Image 
                            style={{width: '100%', 
                                    height: 80, 
                                    borderTopLeftRadius: 9,
                                    borderTopRightRadius: 9}} 
                                    source= {require('../assets/images/login picture.jpg')}></Image>


                        
                                <View style={{flexDirection: 'row', marginBottom: '30%'}}>
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
                                                    placeholder="Enter your student number or Email" 
                                                    placeholderTextColor="#aaa"
                                                    value={newemail}
                                                    onChangeText={(text) => newsetemail(text)}
                                                    >
                                                    
                                                    
                                        </TextInput>
                                </View>
                                



                            <View style={{flexDirection: 'row', marginBottom: '10%'}}>
                                    <Fontisto style={{marginTop:'3%', marginLeft: '10%'}} name="locked" size={15} color="black" />
                                    <Text style={{marginTop: '-8%', marginLeft:'5%'}}>Password</Text>
                                        <TextInput
                                        secureTextEntry={!showPassword}
                                        value={newpassword}
                                        onChangeText={(text) => newsetpassword(text)}
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
                            </View>

                        <View style={{flexDirection:'row', marginTop: 40, marginLeft: 20}}>
                        </View>

                        <View style={{marginLeft: '39%', marginBottom: '20%', }}>
                            <Text  onPress={() => setModalVisible(true)} style={{ textDecorationLine:'underline', fontSize: 15}}>Signup if you haven't already</Text>
                        </View>

                        <View style={{marginLeft: '5%', marginTop: '-22%', fontSize: 15}}>
                            <Text style={{textDecorationLine:'underline'}} onPress={() => newsetmodalVisible (true)} >Admin?</Text>
                        </View>

                        <Pressable  style={{backgroundColor: 'black', width: 100, marginLeft: '35%', height: 30,borderRadius: 99, marginTop:'20%'}}>
                            <Text onPress={Signin} style={{fontSize: 17, color: 'white', marginLeft:'25%',fontWeight:'bold', marginTop:'5%' }}>LOGIN</Text>
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
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: '10%',
        padding: 20,
      },

});


export default Login