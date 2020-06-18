import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {getBlogPosts} from '../Firestore';
import moment from 'moment';
import uuid from 'react-uuid';

export default () => {
  // set state of blogs coming from db
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState(true);

  const onRefresh = useCallback(() => {
    console.log('refreshing blog list');
    setRefreshing(true);

    fetchBlogs().then(blogs => {
      console.log('sort: ', sort);
      setBlogs(() => {
        let sortedList;
        // asc
        if (sort == false) {
          return (sortedList = blogs.sort((a, b) => a.timestamp - b.timestamp));
        } else if (sort == true) {
          return (sortedList = blogs
            .sort((a, b) => a.timestamp - b.timestamp)
            .reverse());
        }
      });

      setRefreshing(false);
    });
  }, [refreshing]);

  const fetchBlogs = useCallback(async () => {
    let blogs = await getBlogPosts();
    return blogs.docs.map(doc => doc.data());
  }, []);

  // get initial blog list from database
  useEffect(() => {
    fetchBlogs().then(blogs => {
      setBlogs(blogs.sort((a, b) => a.timestamp - b.timestamp).reverse());
    });

    return setBlogs([]);
  }, [fetchBlogs]);

  const sortBlogList = () => {
    setSort(!sort);

    let sortedList = blogs.sort((a, b) => a.timestamp - b.timestamp);
    setBlogs(sort ? sortedList : sortedList.reverse());
  };

  return (
    <>
      <View style={styles.orderByContainer}>
        <TouchableOpacity
          onPress={() => {
            sortBlogList();
          }}>
          <Text style={styles.orderText}>
            Ordered By: {!sort ? 'Ascending' : 'Descending'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={blogs}
        keyExtractor={item => uuid()}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        renderItem={({item}) => (
          <Item
            id={item.id}
            title={item.title}
            text={item.text}
            firstName={item.firstName}
            lastName={item.lastName}
            timestamp={item.timestamp}
          />
        )}
      />
    </>
  );
};

const Item = ({id, title, text, firstName, lastName, timestamp}) => {
  let dateFormatted = moment(timestamp).format('MM/DD/YYYY');

  return (
    <TouchableOpacity onPress={() => openPost(id)}>
      <View style={styles.container}>
        <Text style={styles.blogTitle}>{title}</Text>
        <Text style={styles.blogDescription}>{text}</Text>
        <Text style={styles.authorText}>
          Article by: {firstName} {lastName} - {dateFormatted}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const openPost = id => {
  // GO TO A NEW SCREEN HERE
  console.log('post opened', id);
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  blogTitle: {
    fontSize: 24,
    color: 'midnightblue',
    fontWeight: '600',
    paddingBottom: 8,
  },
  blogDescription: {
    fontSize: 14,
    color: 'grey',
  },
  authorText: {
    fontSize: 12,
    marginTop: 5,
    color: 'midnightblue',
  },
  orderByContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  orderText: {
    fontSize: 16,
    color: 'grey',
  },
});
