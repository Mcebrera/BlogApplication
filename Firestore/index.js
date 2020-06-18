import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const getUserByEmail = email => {
  return firestore()
    .collection('Users')
    .where('email', '==', email)
    .limit(1)
    .get()
    .then(querySnapshot => querySnapshot);
};

const savePost = newBlog => {
  return firestore()
    .collection('Blogs')
    .add({
      title: newBlog.title,
      text: newBlog.text,
      timestamp: moment.now(),
      owner: newBlog.owner,
    });
};

const getBlogPosts = () =>
  firestore()
    .collection('Blogs')
    .get();

const createUser = userData => {
  let data = {
    userUID: userData.userUID,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    createdAt: moment.now(),
  };

  return firestore()
    .collection('Users')
    .add(data)
    .then(() => console.log('user saved', data));
};

export {getUserByEmail, savePost, createUser, getBlogPosts};
