import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { getDocs, collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from './Firebase'; 
import { getAuth } from 'firebase/auth';

export default function DetailsPage() {
    const LandingPage = () => {
        router.push('/Landingpage');
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // State variables for student information
    const [name, setName] = useState("no data sent");
    const [studentNumber, setStudentNumber] = useState("no data sent");
    const [course, setCourse] = useState("no data sent");
    const [year, setYear] = useState("no data sent");
    const [email, setEmail] = useState("no data sent");

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const auth = getAuth();
            const uid = auth.currentUser?.uid;

            if (!uid) {
                console.error("No user is currently logged in.");
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", uid)); // Get user document from Firestore
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setName(data.name || "no data sent"); // Set name
                    setStudentNumber(data.studentNumber || "no data sent"); // Set student number
                    setCourse(data.course || "no data sent"); // Set course
                    setYear(data.year || "no data sent"); // Set year
                    setEmail(data.email || "no data sent"); // Set email
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error loading user data from Firestore: ", error);
            }
        };

        fetchStudentDetails(); // Call the fetch function
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Details</Text>

            <View style={styles.detailBox}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.info}>{name}</Text>
                <Text style={styles.label}>Student ID:</Text>
                <Text style={styles.info}>{studentNumber}</Text>
                <Text style={styles.label}>Course:</Text>
                <Text style={styles.info}>{course}</Text>
                <Text style={styles.label}>Year:</Text>
                <Text style={styles.info}>{year}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>{email}</Text>
            </View>

            <Animated.View style={[styles.button, { opacity: fadeAnim }]}>
                <TouchableOpacity onPress={LandingPage}>
                    <Text style={styles.buttonText}>Return To Home</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailBox: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '-4%'
    },
    info: {
        fontSize: 16,
        color: 'black',
        marginLeft: '-4%'
    },
    button: {
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
        borderRadius: 22,
        marginTop: 50,
        marginLeft: '25%',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    }
});

