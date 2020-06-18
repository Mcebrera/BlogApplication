import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default ({navigation}) => {
  return (
    <>
      <TouchableOpacity onPress={() => signOut()}>
        <View style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const signOut = () => {
  auth()
    .signOut()
    .then(() => navigation.navigate('Home'));
};

const styles = StyleSheet.create({
  logoutContainer: {
    backgroundColor: 'midnightblue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  logoutText: {
    fontSize: 24,
    color: 'white',
  },
});
