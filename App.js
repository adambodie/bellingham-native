import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Easing } from 'react-native';
import PhotoList from './Components/PhotoList';
import axios from 'axios';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const formUrl = (method, api_key, photoset_id, user_id, per_page) =>
	`https://api.flickr.com/services/rest/
	?method=${method}
	&api_key=${api_key}
	&photoset_id=${photoset_id}
	&user_id=${user_id}
	&per_page=${per_page}
	&format=json&nojsoncallback=1`;

const url = formUrl('flickr.photosets.getPhotos', '0c3f8d32a28de8434240115b85a28499', '72157689100136400', '8994820%40N07', '250');

export default class App extends Component {
  constructor() {
      super();
      this.spinValue = new Animated.Value(0);
      this.state = {
        photographs: [],
        isLoaded: false
      };
    }
    componentDidMount() {
		axios.get(url)
			.then(response => {
				this.setState({
					photographs: response.data.photoset.photo,
					isLoaded: true
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
			this.spin();
		}
        spin = () => {
            this.spinValue.setValue(0);
                Animated.timing(
                    this.spinValue,
                    {
                        toValue: 1,
                        duration: 4000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ).start(() => this.spin());
            };
  render() {
    const isLoaded = this.state.isLoaded;
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1080deg']
    });
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>The Bellingham Trip: How I Made it to Canada</Text>
        </View>
        {isLoaded ? (
        <ScrollView horizontal={true} scrollEventThrottle={10} pagingEnabled={true}>
            <PhotoList data={this.state.photographs}/>
        </ScrollView>) :
            <View style={styles.spinContainer}>
                <Text style={{marginBottom: 20, fontSize: 48}}>Loading...</Text>
                <Animated.View style={{transform: [{rotate: spin}]}}>
                <FontAwesome style={styles.spinner}>
                    {Icons.spinner}
                </FontAwesome>
                </Animated.View>
            </View>
            }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85bf59',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#14579e',
    marginBottom: 20

  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36
  },
  spinner: {
    fontSize: 72,
    fontFamily: 'fontawesome'
   }
});
