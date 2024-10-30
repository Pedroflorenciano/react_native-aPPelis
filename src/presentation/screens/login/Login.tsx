import { StyleSheet } from "react-native";
import React, { useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import appFirebase from "../../../infrastructure/firebase/crendenciales";
import { RootStackParamsL } from "../../navigations/NavigationLogin";

const auth = getAuth(appFirebase)

export const Login = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamsL>>();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logueo = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password) 
      Alert.alert('Iniciando sesion', 'Accediendo...')
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={GlobalStyle.padre}>

      <View>
        <Image source={require('../../../assets/LogoText.png')} style={GlobalStyle.profileHeader} />
      </View>

      <View>
        <Image source={require('../../../assets/Logo.png')} style={GlobalStyle.profile} />
      </View>

      <View style={GlobalStyle.tarjeta}>
        <View style={GlobalStyle.cajaTexto}>
          <TextInput placeholder='Usuario' style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
          />

        </View>

        <View style={GlobalStyle.cajaTexto}>
          <TextInput placeholder='Contraseña' style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        </View>

        <View style={GlobalStyle.PadreBoton}>
          <TouchableOpacity style={GlobalStyle.cajaBoton} onPress={logueo}>
            <Text style={GlobalStyle.textoBoton}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
function useRoute<T>() {
  throw new Error('Function not implemented.');
}




const GlobalColors ={
    primario: '#e30613',
    secundario: '#706f6f',
    sombra: '#000',
    blanco: 'white',
    negro: 'black'
}

const GlobalStyle = StyleSheet.create({
    padre:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalColors.blanco,
    },
    content:{
        flex: 1,
        backgroundColor: GlobalColors.blanco,
    },
    header:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile:{
        marginTop: -100,
        resizeMode: 'contain',
        width: 150,
        marginBottom: -150
    },
    profileHeader:{
        marginTop: -130,
        resizeMode: 'contain',
        width: 150,
        marginBottom: -150
    },
    tarjeta:{
        marginTop: -20,
        marginHorizontal: 20,
        backgroundColor: GlobalColors.blanco,
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: GlobalColors.sombra,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 5,
        backgroundColor: '#cccccc40',
        borderRadius: 10,
        marginVertical: 10
    },
    PadreBoton:{
        alignItems: 'center'
    },
    cajaBoton:{
        backgroundColor: GlobalColors.primario,
        borderRadius: 10,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    textoBoton: {
        textAlign: 'center',
        color: GlobalColors.blanco,
    }
})