import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ColorPicker } from 'react-native-color-picker';

export default function Homepage() {


    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


  return (
    <>
    <SafeAreaView>
    </SafeAreaView>

    <View style={{backgroundColor: 'black', height: 250, borderRadius: 20, width:370, marginLeft: 20}}>
        <Text style={{color: 'white', marginLeft: 20, marginTop: 80, fontSize: 18}}>MR LN KADIMA</Text>
        <Text style={{color: 'white', marginLeft: 20, marginTop: 20, fontSize: 18}}>223006213</Text>

        

    </View>

    <View style={styles.containers}>

    <Text></Text>
    </View>


    <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ width: "55%"}}>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                height: 200,
                                width: 200,
                                borderRadius: 0,
                                backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: -468,
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

                        <TouchableOpacity
                            style={{
                                backgroundColor: "lightgray",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50,
                                borderRadius: 12,
                                marginTop: 400,
                            }}
                            onPress={pickImage}
                        >
                            <Text>Add New Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
            </>
    );
}


const styles = StyleSheet.create({
    containers:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
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

})