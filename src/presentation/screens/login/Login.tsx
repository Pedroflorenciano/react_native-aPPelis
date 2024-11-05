import React, { useState } from 'react';
import { StyleSheet, Alert, Image, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { auth } from '../../../infrastructure/firebase/crendenciales'; // Asegúrate de que la ruta sea correcta
import { RootStackParams } from '../../navigations/AppNavigation';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logueo = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
    }
  };

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
          <TextInput
            placeholder="Correo electrónico"
            style={{ paddingHorizontal: 15 }}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={GlobalStyle.cajaTexto}>
          <TextInput
            placeholder="Contraseña"
            style={{ paddingHorizontal: 15 }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <View style={GlobalStyle.PadreBoton}>
          <TouchableOpacity style={GlobalStyle.cajaBoton} onPress={logueo}>
            <Text style={GlobalStyle.textoBoton}>Ingresar</Text>
          </TouchableOpacity>
          <Pressable style={GlobalStyle.botonRes} onPress={() => navigation.navigate('Registro')}>
            <Text>Registrarse</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const GlobalColors = {
  primario: '#e30613',
  secundario: '#706f6f',
  sombra: '#000',
  blanco: 'white',
  negro: 'black'
};

const GlobalStyle = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.blanco,
  },
  profile: {
    marginTop: -100,
    resizeMode: 'contain',
    width: 150,
    marginBottom: -150,
  },
  profileHeader: {
    marginTop: -120,
    resizeMode: 'contain',
    width: 150,
    marginBottom: -150,
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
    marginVertical: 10,
  },
  PadreBoton: {
    alignItems: 'center',
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
});

export default Login;
