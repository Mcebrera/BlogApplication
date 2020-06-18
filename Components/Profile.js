import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from 'react-native-elements';
import Logout from './Logout';

export default ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.container}>
        <Avatar
          rounded
          overlayContainerStyle={{backgroundColor: 'lightgrey'}}
          icon={{name: 'user', type: 'font-awesome'}}
          onPress={() => console.log('Works!')}
          size="xlarge"
        />
        <Text style={styles.avatarText}>Upload or Change Your Image</Text>
      </View>
      <View>
        <Logout navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: 'midnightblue',
    fontWeight: '600',
    textAlign: 'center',
  },
  avatarText: {
    fontSize: 20,
    color: 'midnightblue',
    marginTop: 5,
  },
});
