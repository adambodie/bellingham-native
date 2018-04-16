import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Loading extends Component {
      constructor() {
          super();
          this.spinValue = new Animated.Value(0);
        }
        componentDidMount() {
            this.spin();
        }
        spin = () => {
            this.spinValue.setValue(0);
                Animated.timing(
                    this.spinValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ).start(() => this.spin());
            };
  render() {
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1440deg']
    });
    return (
            <View style={styles.container}>
                <Text style={styles.loading}>Loading...</Text>
                <Animated.View style={{transform: [{rotate: spin}]}}>
                    <FontAwesome style={styles.spinner}>
                        {Icons.spinner}
                    </FontAwesome>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    marginBottom: 20,
    fontSize: 48,
    color: 'white'
  },
  spinner: {
    fontSize: 72,
    fontFamily: 'fontawesome',
    color: 'white'
   }
});
