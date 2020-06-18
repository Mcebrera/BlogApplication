import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont(); // load font awesome before using it

export default props => {
  const [visible, setVisible] = useState(false);
  const {signIn} = props;

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login</Text>
        </View>
      </TouchableOpacity>
      <LoginModal signIn={signIn} visible={visible} setVisible={setVisible} />
    </>
  );
};

const LoginModal = props => {
  // true = sign in, false = sign up
  const [loginAction, setLoginAction] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {visible, setVisible, signIn} = props;

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <View style={[styles.overlayStyle, !loginAction ? {height: 500} : {}]}>
          <View style={styles.loginActions}>
            <TouchableOpacity onPress={() => setLoginAction(true)}>
              <Text
                style={[
                  styles.overlayText,
                  !loginAction ? {color: 'lightgrey'} : {},
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLoginAction(false)}>
              <Text
                style={[
                  styles.overlayText,
                  loginAction ? {color: 'lightgrey'} : {},
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Input
            onChangeText={email => setEmailInput(email)}
            placeholder={'email@address.com'}
            label={'Your email address'}
            leftIcon={
              <Icon
                name={'user'}
                style={{marginRight: 10}}
                size={20}
                color={'midnightblue'}
              />
            }
          />
          <Input
            onChangeText={password => setPasswordInput(password)}
            placeholder={'Password'}
            label={'Password'}
            leftIcon={
              <Icon
                name={'lock'}
                style={{marginRight: 10}}
                size={20}
                color={'midnightblue'}
              />
            }
            secureTextEntry={true}
          />
          {!loginAction ? (
            <>
              <Input
                onChangeText={firstName => setFirstName(firstName)}
                placeholder={'First Name'}
                label={'First Name'}
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
                onChangeText={lastName => setLastName(lastName)}
                placeholder={'Last Name'}
                label={'Last Name'}
                leftIcon={
                  <Icon
                    name={'pencil'}
                    style={{marginRight: 10}}
                    size={20}
                    color={'midnightblue'}
                  />
                }
              />
            </>
          ) : null}
          <TouchableOpacity
            style={styles.loginActionButton}
            onPress={() =>
              signIn(
                emailInput,
                passwordInput,
                firstName,
                lastName,
                loginAction,
              )
            }>
            <Text style={styles.loginActionButtonText}>
              {loginAction ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: 'midnightblue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  loginText: {
    fontSize: 24,
    color: 'white',
  },
  overlayStyle: {
    width: 350,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 24,
    color: 'midnightblue',
  },
  loginActions: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'midnightblue',
    marginBottom: 20,
  },
  loginActionButton: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'midnightblue',
  },
  loginActionButtonText: {
    fontSize: 20,
    color: 'white',
  },
});
