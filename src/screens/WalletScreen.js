import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationEvents } from 'react-navigation';
import { navigate } from '../navigationRef';
import { Context as WalletContext } from '../context/WalletContext';

//IS CALLBACK REQUIRED FOR THIS SCREEN?

const WalletScreen = ({navigation}) => {
    const {   
        state: { balance, walletExists},  
        createWallet, 
        deleteWallet, 
        fetchBalance, 
        updateBalance } = useContext(WalletContext);

   
   let newBalance = balance + 100;

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
        <Text> Wallet balance: {balance}</Text>

        <Button icon="rocket" mode="contained" onPress={createWallet} style={{margin: 5}}>Create Wallet</Button>    

        <Button icon="rocket" mode="contained" onPress={()=>updateBalance(newBalance)} style={{margin: 5}}>+100</Button>    
     
        <Button icon="rocket" mode="contained" onPress={fetchBalance} style={{margin: 5}}>Fetch Balance Wallet</Button>    

        <Button icon="rocket" mode="contained" onPress={deleteWallet} style={{margin: 5}}>Delete Wallet</Button>    
  


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default WalletScreen;