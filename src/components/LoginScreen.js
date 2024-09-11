// src/screens/ContactList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { getContacts, saveContacts } from '../storage/storage'; // Asegúrate de la ruta correcta
import { FAB } from 'react-native-paper';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const { logout } = useAuth(); // Usa el hook para obtener la función de logout

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const storedContacts = await getContacts();
        console.log('Contactos cargados:', storedContacts);
        setContacts(storedContacts);
      } catch (error) {
        console.error('Error al cargar contactos:', error);
      }
    };
    loadContacts();
  }, []);

  const handleDelete = (id) => {
    Alert.alert('Eliminar contacto', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const updatedContacts = contacts.filter(contact => contact.id !== id);
            console.log('Contactos después de eliminar:', updatedContacts);
            setContacts(updatedContacts);
            await saveContacts(updatedContacts);
          } catch (error) {
            console.error('Error al eliminar contacto:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={logout} // Llama a la función de logout
        style={{ padding: 10, backgroundColor: 'red', borderRadius: 5, marginBottom: 20 }}>
        <Text style={{ color: 'white' }}>Cerrar Sesión</Text>
      </TouchableOpacity>
      {contacts.length === 0 ? (
        <Text>No hay contactos aún. Agrega uno.</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleDelete(item.id)}
              style={{ backgroundColor: classifyContact(item.birthday), padding: 20, marginBottom: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.birthday}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate('ContactForm')}
      />
    </View>
  );
}
