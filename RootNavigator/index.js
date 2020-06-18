import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import CreatePost from '../Components/CreatePost';
import Profile from '../Components/Profile';
import PostDetail from '../Components/PostDetail';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont(); // load font awesome before using it

import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

export default () => {
  const [userAuth, setUserAuth] = useState();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUserAuth(true);
      } else {
        setUserAuth(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return userAuth ? (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        tabBarOptions={{showIcon: true, showLabel: false}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'home'} size={24} color={'midnightblue'} />
            ),
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'pencil'} size={24} color={'midnightblue'} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'user'} size={24} color={'midnightblue'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Home />
  );
};
