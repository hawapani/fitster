import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GooglePlaces from '../components/GooglePlaces';
import { Button } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { Context as GymContext } from '../context/GymContext';
import { navigate } from '../navigationRef';

const AdminPanel = ({navigation}) => {

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
        <GooglePlaces/>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({});

export default AdminPanel;