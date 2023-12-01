import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import { Context as GymContext } from '../context/GymContext';
import { navigate } from '../navigationRef';

const config = require('../../config');

const googleMapsApiKey = config.googleMapsApiKey;

const photo1 = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;
const maxLengthAddress = 50;
const maxLengthName = 18;


const HomeScreen = ({navigation}) => {
  const { state,fetchGyms } = useContext(GymContext);

  const CustomCard = props => {
    return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
  };
  
  /*IN FIRST IMAGE IN CUSTOMCARD, REPLACE THE 'photo1' IN IMAGE URI WITH: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.result.photos[0].photo_reference}&maxwidth=600&key=${googleMapsApiKey}`*/
 
  return <>
    <NavigationEvents onWillFocus={fetchGyms} />
    <Button icon="food" mode="contained" onPress={() => {navigate('AdminPanel')}} style={{margin: 5}}>AdminPanel</Button>    
    <Button icon="rocket" mode="contained" onPress={() => {navigate('Wallet')}} style={{margin: 5}}>Wallet</Button>    
    <FlatList
      data={state}
      style={{padding: 0, margin: 0,flex: 1, width: "100%"}}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (<>
          <ListItem style={{padding: 0, margin: 0, width: "100%"}}>
            <TouchableOpacity style={{padding: 0, margin: 0, width: "100%"}}  onPress={() => {navigate('GymDetail', item)}}>
              <CustomCard style={styles.card}>
                <Image source={{uri: photo1}} style={{height: 120, width: "100%", borderRadius: 10 }}/>                     
                <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>

                  <View style={{ flex: 1}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.result.name.substring(0, maxLengthName)}</Text>
                    <Text>{item.result.formatted_address.substring(0, maxLengthAddress)}...</Text>                                                 
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: photo1}} style={{height: 20, width: 100, marginTop: 10, alignSelf: 'flex-start' }}/>
                    <View style={{width: 50, marginTop: 5, marginLeft: 2}}>
                      <Text>{item.result.rating}</Text>
                      <Text>({item.result.user_ratings_total})</Text>
                    </View>
                  </View>

                </View>
              </CustomCard>
              <Button style={styles.bookButton} labelStyle={styles.label} mode="contained" onPress={() => navigate('BookSlot', item)}>Book Slot</Button>

            </TouchableOpacity>
          </ListItem>
        </>);
      }}
    />
  </>
};

const styles = StyleSheet.create({
  card: {
    margin: 0,
    flex: 1,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookButton: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center', 
    position: 'absolute', 
    alignSelf: 'center', 
    top: 15,
    right: 15,
  },
});

export default HomeScreen;
