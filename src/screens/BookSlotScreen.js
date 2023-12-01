import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerScreen from '../components/DateTimePickerScreen';
import { Button } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { Context as GymContext } from '../context/GymContext';
import { navigate } from '../navigationRef';

const AdminPanel = ({navigation}) => {
  const { state } = useContext(GymContext);
  const _id = navigation.getParam('_id');
  const gym = state.find((t) => t._id === _id);

  const [selectedDate, setSelectedDate] = useState(null);


  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  return (
    <>
      <DateTimePickerScreen
        mode="datetime" 
        onConfirm={(date) => onConfirm(date)}
      />
      <Button style={styles.bookButton} labelStyle={styles.label} mode="contained" onPress={handleConfirm}>Confirm Slot</Button>

    </>
  );
};



const styles = StyleSheet.create({
  bookButton: {
    margin: 5,
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center', 
    position: 'absolute', 
    alignSelf: 'center', 
    bottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 4,
  },
  label: {
    fontSize: 22, 
    fontWeight: 'bold', 
    color: 'white' 
  }
});

export default AdminPanel;