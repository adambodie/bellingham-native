import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Dimensions } from 'react-native';
import PhotoList from './Components/PhotoList';
import axios from 'axios';
import Loading from './Components/Loading';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default class App extends Component {
  constructor() {
      super();
      this.state = {
        photographs: [],
        isLoaded: false
      };
    }
    componentDidMount() {
		axios.get(`https://s3-us-west-2.amazonaws.com/bellingham.bodiewebdesign.com/data.json`)
			.then(response => {
				this.setState({
					photographs: response.data,
					isLoaded: true
				});
			})
			.catch(error => {
				console.log('Error fetching and parsing data', error);
			});
		}
  render() {
    const isLoaded = this.state.isLoaded;
    return (
    <View style={styles.container}>
        <Header />
        {isLoaded ? (
            <ScrollView horizontal={true} scrollEventThrottle={10} pagingEnabled={true}>
                <PhotoList data={this.state.photographs} />
            </ScrollView>) :
            <Loading />
        }
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://bellingham.bodiewebdesign.com')}>
              Desktop Version
        </Text>
        <Footer />
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
  }
});
