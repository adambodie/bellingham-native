import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Dimensions } from 'react-native';
import PhotoList from './Components/PhotoList';
import axios from 'axios';
import Loading from './Components/Loading';

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
		}
  render() {
    const isLoaded = this.state.isLoaded;
    const date = new Date();
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>The Bellingham Trip: How I Made it to Canada</Text>
        </View>
        {isLoaded ? (
            <ScrollView horizontal={true} scrollEventThrottle={10} pagingEnabled={true}>
                <PhotoList data={this.state.photographs}/>
            </ScrollView>) :
                <Loading/>
        }
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://bellingham.bodiewebdesign.com')}>
              Desktop Version
        </Text>
        <View style={styles.footer}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Adam Bodie &copy; {date.getFullYear()}</Text>
        </View>
    </View>
    );
  }
}
const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85bf59',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#14579e',
    marginBottom: 20
  },
  footer: {
    backgroundColor: '#14579e',
    width: imageWidth,
    marginTop: 20,
    height: 20,
    padding: 20
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36
  }
});
