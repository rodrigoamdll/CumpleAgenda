import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para obtener contactos desde AsyncStorage
export const getContacts = async () => {
  try {
    const contacts = await AsyncStorage.getItem('contacts');
    console.log('Contactos obtenidos:', contacts); // Depuración
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return [];
  }
};

// Función para guardar contactos en AsyncStorage
export const saveContacts = async (contacts) => {
  try {
    console.log('Contactos a guardar:', contacts); // Depuración
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    console.error('Error al guardar contactos:', error);
  }
};
