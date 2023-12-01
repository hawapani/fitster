import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({navigation}) => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext);

  return <View style={styles.container}> 
    <NavigationEvents onWillBlur={clearErrorMessage}/>
    <AuthForm 
      typeText={'Sign Up'}
      errorMessage={state.errorMessage}
      onSubmit={signup}
    />

    <NavLink 
      text='Already have an account? Sign in instead!'
      routeName='Signin'
    />
  </View>
};  

SignupScreen.navigationOptions =  {
    headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  },
});

export default SignupScreen;
