import { View, Text, ToastAndroid, ScrollView, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import Loginimg from '../../assets/Loginimg.jpg'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'




export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  useEffect(()=>{
    Alert.alert("For Login", "Use \n Email: zain@gmail.com \n Password: 123456")

  },[])

  const Login = () => {
    try {
      signInWithEmailAndPassword(auth,email, Password)
        .then(userCredential => {
          const user = userCredential.user.uid
          global.userID = user
          ToastAndroid.show("redirecting to Notes", ToastAndroid.LONG)
          navigation.navigate("addnote")
        })
        .catch(err => {
          ToastAndroid.show("Please Check Your Credentials", ToastAndroid.LONG)
        })
      
    } catch (error) {
      console.log(error);
    }


  }

  const Signup = () => {
    try {
      
      createUserWithEmailAndPassword(auth,email, Password)
        .then(userCredential => {
          const user = userCredential.user
          global.email = user.email
          ToastAndroid.show("redirecting to Notes", ToastAndroid.LONG)
          navigation.navigate("addnote")
        })
        .catch(error => {
          const message = error.message
          const code = error.code
          if(code === "auth/email-already-in-use"){
            ToastAndroid.show("Email already exists! try Login", ToastAndroid.LONG)
          }
          else if(code === "auth/weak-password"){
            ToastAndroid.show("Password is weak", ToastAndroid.LONG)
          }
          else if (code === "auth/invalid-email"){
            ToastAndroid.show("Invalid Email", ToastAndroid.LONG)
          }
          else if(message === "auth/invalid-email"){
            ToastAndroid.show("Invalid Email", ToastAndroid.LONG)
          }

        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ImageBackground source={Loginimg} style={styles.background}>
        <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Notes App</Text>
        </View>
        <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', height: 50, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Email" style={{ width: "100%", paddingLeft: 30 }} onChangeText={newText => setEmail(newText)} />
          </View>
          <View style={{ width: '80%', height: 50, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TextInput placeholder="Password" style={{ width: "100%", paddingLeft: 30 }} onChangeText={newText => setPassword(newText)} />
          </View>
          <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={Login} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "orange" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '80%', height: 50, backgroundColor: 'orange', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={Signup}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginTop: 20
  }
})