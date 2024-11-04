import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { auth, appFirebase } from "../../../infrastructure/firebase/crendenciales";
import { RootStackParams } from '../../navigations/AppNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const db = getFirestore(appFirebase);

export const Registro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  const registro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        age,
        city,
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert('Error', 'Hubo un problema con el registro');
    }
  };

  return (

    <View style={GlobalStyle.padre}>
      <View style={GlobalStyle.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#e30613" />
        </Pressable>
        <Text style={GlobalStyle.TextHeader}>Registro de Usuario</Text>
      </View>
      <View style={GlobalStyle.content}>
        <View style={GlobalStyle.tarjeta}>
          <TextInput placeholder="Nombre" style={GlobalStyle.input} onChangeText={setName} />
          <TextInput placeholder="Correo electrónico" style={GlobalStyle.input} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput placeholder="Contraseña" style={GlobalStyle.input} onChangeText={setPassword} secureTextEntry />
          <TextInput placeholder="Edad" style={GlobalStyle.input} onChangeText={setAge} keyboardType="numeric" />
          <TextInput placeholder="Ciudad" style={GlobalStyle.input} onChangeText={setCity} />

          <View style={GlobalStyle.tarjeta2}>
            <TouchableOpacity style={GlobalStyle.cajaBoton} onPress={registro}>
              <Text style={GlobalStyle.textoBoton}>Registrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default Registro;

const GlobalColors = {
  primario: '#e30613',
  secundario: '#706f6f',
  sombra: '#000',
  blanco: 'white',
  negro: 'black'
}

const GlobalStyle = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: GlobalColors.blanco,
  },
  header: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  TextHeader: {
    color: GlobalColors.secundario,
    fontSize: 20,
    marginHorizontal: 10
  },
  profile: {
    marginTop: -100,
    resizeMode: 'contain',
    width: 150,
    marginBottom: -150
  },
  profileHeader: {
    marginTop: -130,
    resizeMode: 'contain',
    width: 150,
    marginBottom: -150
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    marginTop: -20,
    marginHorizontal: 20,
    backgroundColor: GlobalColors.blanco,
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: GlobalColors.sombra,
    shadowOffset: {
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
  tarjeta2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  PadreBoton: {
    alignItems: 'center'
  },
  cajaBoton: {
    backgroundColor: GlobalColors.primario,
    borderRadius: 10,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,

  },
  textoBoton: {
    textAlign: 'center',
    color: GlobalColors.blanco,
  },
  botonRes: {
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#cccccc40',
    borderRadius: 10,
    marginVertical: 10,
  },
  botonLink: {
    marginTop: 20,
    alignItems: 'center',
  },
})