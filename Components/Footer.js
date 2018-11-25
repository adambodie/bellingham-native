import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const date = new Date();
const Footer = props => (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Adam Bodie &copy; {date.getFullYear()}</Text>
        </View>
);
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
const styles = StyleSheet.create({
      footer: {
        backgroundColor: '#14579e',
        width: imageWidth,
        marginTop: 20,
        height: 20,
        padding: 20
      },
      footerText :{
        color: 'white',
        fontWeight: 'bold'
      }
});

export default Footer;