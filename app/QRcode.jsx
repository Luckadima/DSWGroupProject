import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";


function QRcode(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };
  
      getCameraPermissions();
    }, []);
  
    const handleBarcodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const tolanding = () => {
      router.push('/Landingpage')
    }

    return(
      <>
     <View style={styles.container}>

      <View style={{marginRight: '80%', marginBottom: '40%'}}>
        <AntDesign onPress={tolanding} name="back" size={24} color="black" />
      </View>


      <View style={styles.barcodebox}>


      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
      </View>

      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    marginBottom: '45%'
  }
});
export default QRcode