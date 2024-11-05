import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../../../infrastructure/firebase/crendenciales';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { RootStackParams } from '../../navigations/AppNavigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

interface Message {
    id: string;
    text: string;
    userId: string;
    timestamp: Date;
}



const Mensajes = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [editingMessage, setEditingMessage] = useState<Message | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const messagesRef = collection(db, 'users', user.uid, 'messages');
        const querySnapshot = await getDocs(messagesRef);
        const loadedMessages = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as Message[];
        setMessages(loadedMessages);
    };

    // Agregar un mensaje a la subcolección `messages`
    const addMessage = async () => {
        const user = auth.currentUser;
        if (!user) return Alert.alert('Error', 'Debes estar autenticado para agregar un mensaje.');

        if (newMessage.trim() === '') return Alert.alert('Error', 'El mensaje no puede estar vacío.');

        const messagesRef = collection(db, 'users', user.uid, 'messages');
        const docRef = await addDoc(messagesRef, {
            text: newMessage,
            userId: user.uid,
            timestamp: new Date(),
        });
        setMessages([...messages, { text: newMessage, userId: user.uid, id: docRef.id, timestamp: new Date() }]);
        setNewMessage('');
    };

    // Editar un mensaje
    const editMessage = (message: Message) => {
        setNewMessage(message.text);
        setEditingMessage(message);
    };

    // Actualizar un mensaje en la subcolección `messages`
    const updateMessage = async () => {
        if (!editingMessage) return;
        const user = auth.currentUser;
        if (!user) return;

        const messageRef = doc(db, 'users', user.uid, 'messages', editingMessage.id);
        await updateDoc(messageRef, { text: newMessage });
        setMessages(messages.map((msg) => (msg.id === editingMessage.id ? { ...msg, text: newMessage } : msg)));
        setNewMessage('');
        setEditingMessage(null);
    };

    // Eliminar un mensaje de la subcolección `messages`
    const deleteMessage = async (id: string) => {
        const user = auth.currentUser;
        if (!user) return;

        const messageRef = doc(db, 'users', user.uid, 'messages', id);
        await deleteDoc(messageRef);
        setMessages(messages.filter((msg) => msg.id !== id));
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headeri}>
                    <Pressable onPress={() => navigation.navigate('Users')}>
                        <Icon name="cancel" size={30} color="white" />
                    </Pressable>
                </View>
                <View style={styles.headert}>
                    <View style={{ marginBottom: 20 }}><Icon name="mail" size={100} color="white" /></View>
                    <Text style={styles.title}>
                        Comentarios
                    </Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.comentarios}>
                    <FlatList
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.messageContainer}>
                                <Text style={styles.messageText}>{item.text}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => editMessage(item)}>
                                        <Text style={styles.editButton}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                                        <Text style={styles.deleteButton}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.botonH}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe un mensaje"
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <Pressable onPress={editingMessage ? updateMessage : addMessage} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>{editingMessage ? 'Actualizar Mensaje' : 'Agregar Mensaje'}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    header: {

        backgroundColor: '#e30613',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headeri: {

    },
    headert: {
        alignItems: 'center'
    },
    body: {
        flex: 1
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    messageText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    editButton: {
        color: 'blue',
        marginRight: 10,
    },
    deleteButton: {
        color: 'red',
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
    comentarios:{
        flex: 1,
        padding: 20
    },
    botonH:{
        padding: 5
    }
});

export default Mensajes;
