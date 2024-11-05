import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { auth } from "../../../infrastructure/firebase/crendenciales";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { signOut, updateEmail, updatePassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigations/AppNavigation';

const db = getFirestore();
const storage = getStorage();

interface UserData {
    name: string;
    email: string;
    age: string;
    city: string;
    profileImageUrl?: string;
}

export const Perfil = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
                if (uploadUrl) {
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
            return await getDownloadURL(storageRef);
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

                await updateDoc(userRef, {
                    name: userData.name,
                    age: userData.age,
                    city: userData.city,
                });

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
        navigation.navigate('Login');
        Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </Pressable>
                <Text style={styles.title}>
                    Perfil
                </Text>
            </View>

            <View style={styles.body}>
                <Text>Nombre y Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={userData.name}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
                <Text>Edad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    value={userData.age}
                    keyboardType="numeric"
                    onChangeText={(text) => setUserData({ ...userData, age: text })}
                />
                <Text>Ciudad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ciudad"
                    value={userData.city}
                    onChangeText={(text) => setUserData({ ...userData, city: text })}
                />
            </View>

            <View style={styles.footer}>
                <Pressable onPress={handleUpdateProfile} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Actualizar</Text>
                </Pressable>
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
        flexDirection: 'row',
        backgroundColor: '#e30613',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
    },
    body: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginHorizontal: 15,
        color: 'white',
        textAlign: 'center'
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
        backgroundColor: '#e30613',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 20,
    },
    footer: {
        padding: 20,
    }
});


