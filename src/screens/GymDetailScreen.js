import React, {useState,useEffect, useContext } from 'react';
import { View, StyleSheet,Image, Text, ScrollView, SafeAreaView, Animated, TouchableOpacity, Linking} from 'react-native';
import { Button } from 'react-native-paper'; 
import OpenMap from 'react-native-open-maps';
import MapView, { Polyline } from 'react-native-maps';
import { NavigationEvents } from 'react-navigation';
import { Context as GymContext } from '../context/GymContext';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import Star from '../components/Star';
import HalfStar from '../components/HalfStar';

const config = require('../../config');

const googleMapsApiKey = config.googleMapsApiKey;


const GymDetailScreen = ({navigation}) => {
  const { state } = useContext(GymContext);
  const _id = navigation.getParam('_id');
  const gym = state.find((t) => t._id === _id);

  const color1 = "#007BCA"
 /* REPLACE PHOTO URIs & ADD LOOP TO ADD ALL PHOTOS
  const photo1 = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${gym.result.photos[0].photo_reference}&maxwidth=600&key=${googleMapsApiKey}`;
  const photo2 = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${gym.result.photos[1].photo_reference}&maxwidth=600&key=${googleMapsApiKey}`;
  const photo3 = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${gym.result.photos[2].photo_reference}&maxwidth=600&key=${googleMapsApiKey}`;
 */

  const photo1 = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
  const photo2 = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
  const photo3 = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

  const lat = gym.result.geometry.location.lat;
  const lng = gym.result.geometry.location.lng;
  
  const stars = gym.result.rating;          
  const noOfRatings = gym.result.user_ratings_total;   

  const address = gym.result.formatted_address; 

  const openGoogleMaps = () => {
    const location = {
      latitude: lat, 
      longitude: lng, 
    };
  
    const query = gym.result.name; // Replace with the name of the place
  
    const options = {
      end: query,
      navigate_mode: 'preview', // Use 'preview' to open Google Maps app directly
    };
  
    try {
      OpenMap({ ...location, ...options });
    } catch (error) {
      console.error('Error opening Google Maps:', error);
    }  };

  const gymAmenities = [              //insert code for list of amenities of the gym
    {id: "1",amenities: "Earnest",},
    {id: "2",amenities: "Winston",},
    {id: "3",amenities: "Carltonns",},
    {id: "4",amenities: "Malcolmie",},
    {id: "5",amenities: "Michell",},
    {id: "6",amenities: "Carlton",},
    {id: "7",amenities: "Jessieson",},
    {id: "8",amenities: "Juliani",}
  ];

  const equipment = [                 //insert code for list of equipment available at the gym
    {id: "1",machine: "Chest press",},
    {id: "2",machine: "Back fly",},
    {id: "3",machine: "Cable multigym",},
    {id: "4",machine: "Bench press",},
    {id: "5",machine: "Dumbbells",},
    {id: "6",machine: "Cardio Track",},
    {id: "7",machine: "Crunches machine",},
    {id: "8",machine: "Treadmill",}
  ];

  const reviews = gym.result.reviews;

  const reviewsArray = [];

  const Card = props => {
    return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
  };

  const StarBar = () => {
    const subElements = [];

    for (let i = 1; i < 6; i++) {
      if(i<=stars)
      subElements.push(<Star/>);
      else
      subElements.push(<HalfStar/>);
    }
  
    return (
      <View style={{flexDirection: 'row'}}>
        {subElements}
      </View>
    );
  };
  
  const PercentageBar = ({ starText, percentage }) => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.progressText}>{starText}</Text>
        <View style={styles.progressMiddle}>
          <View style={styles.progressWrap}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${percentage}%`,
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.progressPercentText}>{percentage}%</Text>
      </View>
    );
  };  

 
  const Wrapper = () => (  <>  
    <ScrollView>

      <View title={"Image box"} style={styles.imageBox}>
        <Image source={{uri: photo1}} resizeMode='cover' style={{aspectRatio: 5/4, height: '100%'}}/>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Image source={{uri: photo2}} resizeMode='cover' style={{width: '100%', height: '50%'}}/>
          <Image source={{uri: photo3}} resizeMode='cover' style={{width: '100%', height: '50%'}}/>
        </View>
      </View>

      <Text style={styles.gymName}>
        {gym.result.name}
      </Text>
      
      <View title={"rating"} style={{flexDirection: 'row'}}>
      <View style={styles.totalWrap}>
          {StarBar()}
        <Text style={styles.rating}>{stars}</Text>
        <Text style={styles.numberOfRatings}>({noOfRatings})</Text>
        </View>
      </View>

      <View title={"address + map link"} style={{flexDirection: 'row', flex: 1, height: 70}}>
        <Text style={styles.address}>
          {address}
        </Text>
        <TouchableOpacity  onPress={openGoogleMaps}>
        <FontAwesome5 name="map-marked-alt" size={30} color='grey' />
        </TouchableOpacity>
      </View>

      <View titile={"buttons"} style={{flexDirection: 'row'}}>
      <Button style={{margin: 5,flex: 1, backgroundColor: '#25D366'}} icon="whatsapp" mode="contained" onPress={() => console.log('Pressed')}>
      whatsapp
      </Button>

      <Button style={{margin: 5, flex: 1, backgroundColor: color1}} icon="phone" mode="contained" onPress={() => console.log('Pressed')}>
      call
      </Button>

      </View>

      <Text>Gym amenities:</Text>

      <View title={"amenities"} style={styles.amenities}>
        <View style={{flexDirection: 'column', flex: 1}}>
          {gymAmenities.map((gym) => {
            return (
              <View key={gym.id}>
                <Text>{"\u2022"} {gym.amenities}</Text>
              </View>
            );
          })}
        </View>
        
        <View style={{flexDirection: 'column', flex: 1}}>
          {gymAmenities.map((gym) => {
            return (
              <View key={gym.id}>
                <Text>{"\u2022"} {gym.amenities}</Text>
              </View>
            );
          })}
        </View>
                  
      </View>

      <Text>Equipment:</Text>
      <View title={"equipment tile 1"}style={{flexDirection: 'row'}}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Chest</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Back</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>
        </Card>
      </View>

      <View title={"equipment tile 2"}style={{flexDirection: 'row'}}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Biceps</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Triceps</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
      </View>

      <View title={"equipment tile 3"}style={{flexDirection: 'row'}}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Legs</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Core</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
      </View>

      <View title={"equipment tile 4"}style={{flexDirection: 'row'}}>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Cardio</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Others</Text>
          <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
            {equipment.map((item) => {
              return (
                <View key={equipment.id}>
                  <Text>{"\u2022"} {item.machine}</Text>
                </View>
              );
            })}
          </View>

        </Card>
      </View>

      <View titile={"Stars and percentage bar"} style={styles.container}>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Customer reviews</Text>
          <View style={styles.totalWrap}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
       
            {StarBar()}
            </View>
            <Text>4.7 out of 5</Text>
          </View>

          <Text style={styles.amountText}>40 customer ratings</Text>

            <View style={{ marginTop: 40 }}>
              <View style={styles.spacer}>
                <PercentageBar starText="5 star" percentage={84} />
              </View>
              <View style={styles.spacer}>
                <PercentageBar starText="4 star" percentage={9} />
              </View>
              <View style={styles.spacer}>
                <PercentageBar starText="3 star" percentage={4} />
              </View>
              <View style={styles.spacer}>
                <PercentageBar starText="2 star" percentage={2} />
              </View>
              <View style={styles.spacer}>
                <PercentageBar starText="1 star" percentage={1} />
              </View>
            </View>

        </View>
      </View>
          
      {reviewsArray}

      <View style={{height: 100, width: 100}}></View>
      
    </ScrollView>
    
    <Button style={styles.bookButton} labelStyle={styles.label} mode="contained" onPress={() => navigate('BookSlot', gym)}>Book Slot</Button>
  </>
  );

  for (let item of reviews) {
    const newComponent = 
    <Card style={styles.card}>
      <View style={{flexDirection: 'row',flex: 1, width: "100%", justifyContent: "space-between"}}>
        <Text style={styles.sectionTitle}>{item.author_name}</Text>
        <Text style={{fontSize: 14}}>{item.rating}</Text>
      </View>
      <View style={{flexDirection: 'column', flex: 1, color: 'black'}}>
        <Text>
          {item.text}
        </Text>
      </View>
    </Card>;
    reviewsArray.push(newComponent);
  }

  return <SafeAreaView style={styles.generalContainer} forceInset={{top: 'always'}}>
    <Wrapper/>
  </SafeAreaView>
};

const styles = StyleSheet.create({
  generalContainer: {
    padding: 15,
  },
  map: {
    height: 300
  },
  imageBox: {
    flexDirection: 'row',
    height: 180,
  },
  gymName: {
    fontSize: 32,
    marginTop: 5,
    fontWeight: 'bold',
    maxHeight: 90
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    width: 25
  },
  numberOfRatings: {
    fontSize: 13,
    maxWidth: 45,
    marginTop: 2
  },
  address: {
    fontSize: 14,
    flex: 1
  },
  amenities: {
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  card: {
    margin: 5,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  container: {
    flex: 1,
    padding: 0,
   // backgroundColor: "#F5F8FF",
    alignItems: 'center',
    justifyContent: "center",
  },
  reviewContainer: {
    flex:1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
    minWidth: "80%",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    shadowColor: "rgba(193, 211, 251, 0.5)",
    elevation: 5,
  },
  reviewTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#323357",
    textAlign: "center",
  },
  totalWrap: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 5,
    backgroundColor: "#F5F8FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 16,
    color: "#595B71",
    textAlign: "center",
  },
  progressText: {
    width: 50,
    fontSize: 14,
    color: "#2A5BDA",
  },
  progressPercentText: { 
    width: 40, 
    fontSize: 14, 
    color: "#323357" 
  },
  progressMiddle: {
    height: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  progressWrap: {
    backgroundColor: "#F5F8FF",
    borderRadius: 18,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  progressBar: {
    flex: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#ffcc48",
    shadowOpacity: 1.0,
    shadowRadius: 4,
    backgroundColor: "#FFCC48",
    borderRadius: 18,
    minWidth: 5,
  },
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
    color: 'white' }
});

export default GymDetailScreen;
