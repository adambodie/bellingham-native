import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
const Photo = props => (
  <View style={styles.container}>
  <Image source={{uri: `https://farm${props.farm}.staticflickr.com/${props.server}/${props.id}_${props.secret}_z.jpg`}} style={styles.image} resizeMode="contain"  />
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.index} of 250</Text>
  </View>
);
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
const styles = StyleSheet.create({
    container: {
        width: dimensions.width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        flex:1,
        width: imageWidth,
        height: imageHeight,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    }
});

export default Photo;