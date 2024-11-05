import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from './ruta/a/tus/credenciales';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth } from './ruta/a/tus/credenciales'; // Asegúrate de que `auth` esté configurado

