import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="ContactList">
      <Drawer.Screen name="ContactList" component={ContactList} />
      <Drawer.Screen name="ContactForm" component={ContactForm} />
    </Drawer.Navigator>
  );
}
