import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getContacts, saveContacts } from '../storage/storage'; // Ruta correcta

const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigation = useNavigation();
  
  const handleSubmit = async () => {
    if (!name || !phone || !email || !birthday) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const newContact = { id: generateId(), name, phone, email, birthday };
      console.log('Nuevo contacto:', newContact); // Depuración

      const contacts = await getContacts();
      console.log('Contactos existentes:', contacts); // Depuración
      
      contacts.push(newContact);
      await saveContacts(contacts);
      console.log('Contactos guardados:', contacts); // Depuración

      navigation.navigate('ContactList');
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      Alert.alert('Error', 'No se pudo guardar el contacto.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Fecha de Cumpleaños (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Agregar Contacto" onPress={handleSubmit} />
    </View>
  );
}
