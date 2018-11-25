import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = props => (
        <View style={styles.header}>
            <Text style={styles.title}>The Bellingham Trip: How I Made it to Canada</Text>
        </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#14579e',
    marginBottom: 20
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36
  }
});

export default Header;