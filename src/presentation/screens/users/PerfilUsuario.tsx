import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth } from "../../../infrastructure/firebase/crendenciales";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { signOut, updateEmail, updatePassword } from 'firebase/auth';

const db = getFirestore();
const storage = getStorage();

// Definimos la interfaz para el tipo de datos del usuario
interface UserData {
  name: string;
  email: string;
  age: string;
  city: string;
  profileImageUrl?: string;
}

export const PerfilUsuario = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    age: '',
    city: '',
    profileImageUrl: '',
  });
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });

    if (result.didCancel) return;
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        const uploadUrl = await uploadImageAsync(uri);
        if (uploadUrl) { // Verifica que `uploadUrl` sea válido antes de llamarlo
          setUserData({ ...userData, profileImageUrl: uploadUrl });
          await updateProfileImage(uploadUrl);
        }
      }
    }
  };

  const uploadImageAsync = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const user = auth.currentUser;
    if (user) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef); // Devuelve la URL como `string`
    }
    throw new Error("Usuario no autenticado");
  };

  const updateProfileImage = async (url: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { profileImageUrl: url });
        Alert.alert("Imagen de perfil actualizada");
      }
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
      Alert.alert("Error", "No se pudo actualizar la imagen de perfil.");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);

        // Actualizar datos en Firestore
        await updateDoc(userRef, {
          name: userData.name,
          age: userData.age,
          city: userData.city,
        });

        // Actualizar email y contraseña en Authentication
        if (newEmail) await updateEmail(user, newEmail);
        if (newPassword) await updatePassword(user, newPassword);

        Alert.alert("Perfil actualizado", "Los datos han sido actualizados correctamente.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Alert.alert("Error", "No se pudieron actualizar los datos.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={userData.profileImageUrl ? { uri: userData.profileImageUrl } : require('../../../assets/default-profile.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.imageText}>Toca la imagen para cambiarla</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={userData.name}
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={userData.age}
        keyboardType="numeric"
        onChangeText={(text) => setUserData({ ...userData, age: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={userData.city}
        onChangeText={(text) => setUserData({ ...userData, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevo correo electrónico"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Button title="Actualizar perfil" onPress={handleUpdateProfile} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  imageText: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
  },
});

export default PerfilUsuario;
