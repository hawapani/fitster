import React, { useContext } from "react";
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigationFocus } from 'react-navigation';
import { Context as SessionContext } from "../context/SessionContext";
import { Context as WalletContext } from "../context/WalletContext";

const ScanScreen = ({ isFocused }) => {

  const {
    state: {sessionID}, 
    startSession, 
    stopSession, 
  } = useContext(SessionContext);

 const { state: { balance, isLowBalance }, updateBalance } = useContext(WalletContext);

  let startTime;

const handleScan = () => {
  const scanTime = 1701165738215; //getTime();
  const gymID = getGymID();
  if(sessionID) {  //The session is already running and we need to STOP the session
    if (scanTime>startTime)
    { 
      const duration = Math.floor(scanTime - startTime);
      stopSession(scanTime, duration, sessionID, gymID, balance, updateBalance);
      startTime = Infinity;
    }
    else
    { console.log("start time is greater than end time of session")}
  } 
  
  else {               //The session is NOT running and we need to START the session
    startTime = scanTime;
    startSession(scanTime, gymID, isLowBalance);
  }
}


const getTime = () => {
  const timeStamp = "Put code to extract timestamp from scan of QR code"
  return timeStamp;
}

const getGymID = () => {
  const placeID = 'ChIJRS5jgRYZDTkR73xuvNnqFMo'; // "Put code to extract GYM ID from scan of QR code"
  return placeID;
}

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text h2> QR Code scanner</Text>
      <Button mode="contained" onPress={handleScan}>Scanned</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(ScanScreen);

