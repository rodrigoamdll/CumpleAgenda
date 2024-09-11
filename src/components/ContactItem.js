import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContactItem({ contact, onLongPress }) {
  const { name, birthday } = contact;

  const calculateColor = (birthday) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    if (birthdayDate.getDate() === today.getDate() && birthdayDate.getMonth() === today.getMonth()) {
      return 'green';
    } else if (birthdayDate < today) {
      return 'red';
    } else {
      return 'blue';
    }
  };

  return (
    <TouchableOpacity onLongPress={onLongPress} style={[styles.container, { backgroundColor: calculateColor(birthday) }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.birthday}>{birthday}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  birthday: {
    fontSize: 16,
    color: '#888',
  },
});
