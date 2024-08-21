import { Text, View,Pressable, StyleSheet,} from "react-native";
import { router } from "expo-router";
import Onboarding from '@/Components/Onboarding';

export default function Index() {
  const Login = () => {
    router.push("/Login") 
  };

  const Logins = () => {
    router.push("/Login") 
  };


  return (
    <>

    <View style={styles.container}>
      <Onboarding />
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
