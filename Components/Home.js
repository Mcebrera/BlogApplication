import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {getUserByEmail, createUser} from '../Firestore';
import {SafeAreaView, StyleSheet} from 'react-native';

// Components
import BlogList from './BlogList';
import LoginButton from './LoginButton';

export default ({navigation}) => {
  // for login purposes
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      getUserByEmail('michael.cebrera').then(res =>
        console.log('user data -> ', res),
      );
    }
  }, []);

  if (initializing) return null;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BlogList />
        {!user ? <LoginButton signIn={signIn} /> : null}
      </SafeAreaView>
    </>
  );
};

const signIn = (email, password, firstName, lastName, action) => {
  if (!action) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        createUser({
          firstName,
          lastName,
          userUID: auth().currentUser.uid,
          email: auth().currentUser.email,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.log('there was an error: ', error);
      });
  } else if (action) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('signed in'))
      .catch(() => console.log('there was an error signing in'));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
