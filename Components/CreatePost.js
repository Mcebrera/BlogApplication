import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont(); // load font awesome before using it
import {TouchableOpacity} from 'react-native-gesture-handler';
import {savePost} from '../Firestore';
import auth from '@react-native-firebase/auth';

export default ({navigation}) => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const submitPost = () => {
    if (!title && !text) {
      console.log('empty fields');
      return;
    }

    savePost({title, text, owner: auth().currentUser.uid});
    setTitle('');
    setText('');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.createPostHeader}>What's On Your Mind?</Text>
      </View>
      <View>
        <Input
          onChangeText={title => setTitle(title)}
          placeholder={'Your title here'}
          label={'Title'}
          leftIcon={
            <Icon
              name={'pencil'}
              style={{marginRight: 10}}
              size={20}
              color={'midnightblue'}
            />
          }
        />
        <Input
          onChangeText={text => setText(text)}
          placeholder={'What would you like to share?'}
          label={'Body'}
          multiline={true}
          numberOfLines={12}
          textAlignVertical={'top'}
          leftIcon={
            <Icon
              name={'pencil'}
              style={{marginRight: 10}}
              size={20}
              color={'midnightblue'}
            />
          }
        />
      </View>
      <TouchableOpacity onPress={() => submitPost()}>
        <View style={styles.buttonContainer}>
          <Text style={styles.submitText}>Post</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostHeader: {
    fontSize: 24,
    color: 'midnightblue',
    fontWeight: '600',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'midnightblue',
    height: 60,
  },
  submitText: {
    fontSize: 24,
    color: 'white',
  },
});
