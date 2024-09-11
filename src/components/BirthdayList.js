import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAuth } from '../context/AuthProvider';

export default function BirthdayList({ contacts }) {
  const classifyContacts = (contacts) => {
    const today = new Date();
    return contacts.map((contact) => {
      const birthdayDate = new Date(contact.birthday);
      if (birthdayDate.getDate() === today.getDate() && birthdayDate.getMonth() === today.getMonth()) {
        contact.color = 'green';
      } else if (birthdayDate < today) {
        contact.color = 'red';
      } else {
        contact.color = 'blue';
      }
      return contact;
    });
  };

  const classifiedContacts = classifyContacts(contacts);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={classifiedContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: item.color, padding: 20, marginVertical: 10 }}>
            <Text>{item.name}</Text>
            <Text>{item.birthday}</Text>
          </View>
        )}
      />
    </View>
  );
}
