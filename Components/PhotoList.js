import React from 'react';
import Photo from './Photo';
import { View, StyleSheet } from 'react-native';
const PhotoList = props => {
	let results = props.data;
	let photos = results.map((x, index) =>
		<View key={x.id}>
			<Photo farm={x.farm} server={x.server} id={x.id} secret={x.secret} title={x.title} index={index + 1}/>
		</View>
	)
	return(
	    <View style={styles.container}>
		    {photos}
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    }
});

export default PhotoList;