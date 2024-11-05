import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { auth } from "../../../infrastructure/firebase/crendenciales";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigations/AppNavigation';

const db = getFirestore();

interface UserData {
  name: string;
  email: string;
  age: string;
  city: string;
  profileImageUrl?: string;
}

export const PerfilUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    age: '',
    city: '',
    profileImageUrl: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userDocData = userDoc.data() as UserData;
          if (userDocData) {
            setUserData(userDocData);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);


  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headeri}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="cancel" size={30} color="white" />
          </Pressable>
        </View>
        <View style={styles.headert}>
          <View style={{ marginBottom: 20 }}><Icon name="mood" size={100} color="white" /></View>
          <Text style={styles.title}>
            <Text style={styles.title}>
              Hola... <Text style={{ fontWeight: 'bold' }}>{userData.name || 'Usuario'}</Text>
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={{marginBottom: 15}}>CONFIGURACION DE PERFIL</Text>
        <View style={styles.block}>
          <Pressable onPress={() => navigation.navigate('Perfil')} style={{flexDirection: 'row', marginBottom: 10}}>
            <Icon name="person" size={20} color="black" />
            <Text> Datos Personales</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ConfiUser')} style={{flexDirection: 'row', marginBottom: 10}}>
            <Icon name="token" size={20} color="black" />
            <Text> Registro</Text>
          </Pressable>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    flex: 1,
    backgroundColor: '#e30613',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headeri: {
    marginBottom: 50
  },
  headert: {
    flex: 1,
    alignItems: 'center'
  },
  body: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 15,
    color: 'white',
    textAlign: 'center'
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 2, // Grosor del borde
    borderColor: '#706f6f', // Color del borde
    borderRadius: 20, // Opcional: redondea las esquinas del botón
  },
  logoutText: {
    color: '#706f6f',
    fontSize: 15,
  },
  block: {

  }
});

export default PerfilUsuario;
