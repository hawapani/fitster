import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);

  return <View style={styles.container}>
    <NavigationEvents onWillBlur={clearErrorMessage}/>
    <AuthForm 
      typeText={'Sign In'}
      errorMessage={state.errorMessage}
      onSubmit={signin}
    />
    <NavLink 
      routeName= 'Signup'
      text= {"Don't have an account? Sign up instead!"}
    />
  </View>
};

SigninScreen.navigationOptions =  {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  },
});

export default SigninScreen;
