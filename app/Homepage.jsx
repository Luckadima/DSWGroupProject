import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usercontext } from './Context';
import { useContext } from "react";

// Firebase imports
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added getDoc to import
import { db } from './Firebase'; // Import Firestore instance
import { getAuth } from 'firebase/auth';

export default function Homepage() {
    // const { user } = useContext(usercontext);  // User email
    // const { users } = useContext(usercontext);
    
    const [image, setImage] = useState(null);
    const [name, setName] = useState("no data sent"); // State for name
    const [studentNumber, setStudentNumber] = useState("no data sent"); // State for student number

    // Load image URL and user info from Firestore based on UID when the component mounts
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const auth = getAuth();
                const uid = auth.currentUser?.uid; // Get current user's UID

                if (uid) {
                    const userDoc = await getDoc(doc(db, "users", uid)); // Get user document from Firestore
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        // Set the image URL, name, and student number
                        if (data.imageUrl) {
                            setImage(data.imageUrl);
                        }
                        setName(data.name || "no data sent"); // Use data.name or default
                        setStudentNumber(data.studentNumber || "no data sent"); // Use data.studentNumber or default
                    } else {
                        console.log("No such document!");
                    }
                }
            } catch (error) {
                console.error("Error loading user data from Firestore: ", error);
            }
        };
        loadUserData();
    }, []);

    // Function to upload image to Firebase Storage
    const uploadImageToFirebase = async (uri) => {
        try {
            const auth = getAuth(); // Get Firebase Auth instance
            const uid = auth.currentUser?.uid; // Use UID instead of email

            const response = await fetch(uri);
            const blob = await response.blob();

            const storage = getStorage();
            const storageRef = ref(storage, `images/${uid}/profile-image`); // Save under UID

            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, blob);

            // Get the download URL
            const downloadUrl = await getDownloadURL(storageRef);

            // Store the URL in Firestore under the user's document
            await setDoc(doc(db, "users", uid), { imageUrl: downloadUrl }, { merge: true });

            return downloadUrl;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    };

    // Function to pick an image from gallery or camera
    const pickImage = async () => {
        // Request permission for both camera and media library
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
            alert('Camera and gallery permissions are required.');
            return;
        }

        // Display options for camera or gallery
        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            const imageUrl = await uploadImageToFirebase(result.assets[0].uri);
                            if (imageUrl) {
                                setImage(imageUrl);
                                await AsyncStorage.setItem('image', imageUrl);
                            }
                        }
                    },
                },
                {
                    text: 'Pick from Gallery',
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            const imageUrl = await uploadImageToFirebase(result.assets[0].uri);
                            if (imageUrl) {
                                setImage(imageUrl);
                                await AsyncStorage.setItem('image', imageUrl);
                            }
                        }
                    },
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    return (
        <>
            <SafeAreaView>
            </SafeAreaView>

            <View style={{ backgroundColor: 'black', height: 250, borderRadius: 20, width: 370, marginLeft: 20 }}>
                <Text style={{ color: 'white', marginLeft: 20, marginTop: 80, fontSize: 18 }}>{name} </Text>
                <Text style={{ color: 'white', marginLeft: 20, marginTop: 20, fontSize: 18 }}>{studentNumber} </Text>
            </View>

            <View style={styles.containers}>
                <Text></Text>
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ width: "55%" }}>
                        <View>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: 0,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: -250,
                                    marginLeft: 80
                                }}
                            >
                                {image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <AntDesign name="camera" size={54} color="black" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            <View>
                <Image style={{ height: '30%', width: "30%", marginTop: '20%', marginLeft: '35%' }} source={require('../assets/images/airdrop-logo.jpg')} />
                <Text style={{ marginLeft: '40%', marginTop: '5%' }}>Tap to Enter</Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "lightgray",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 200,
                    borderRadius: 22,
                    marginTop: 50,
                    marginLeft: '25%',
                }}
                onPress={pickImage}
            >
                <Text>Add New Image</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 0,
    },
});

