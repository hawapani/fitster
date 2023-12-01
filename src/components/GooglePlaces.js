import React, { useContext, useCallback } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Context as GymContext } from '../context/GymContext';
const config = require('../../config');

const GooglePlaces = () => {

  const {  addGym } = useContext(GymContext);
  
  const IRgym = 'ChIJRS5jgRYZDTkR73xuvNnqFMo'; //Place ID for Intense rigour gym

  const getPlaceDetails = useCallback(async (pID) => {

    const placeId = pID;
    console.log(pID);
   
    const apiKey = config.googleMapsApiKey;

    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.result) {
        addGym( placeId , data.result);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  }, [addGym]);

  return (
    <View>
    <Button icon="food" mode="contained" onPress={()=>{getPlaceDetails(IRgym)}}>update intense rigour</Button>    
    </View>
  );

};

export default GooglePlaces;


