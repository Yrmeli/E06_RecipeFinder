
// Import

import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

// Main

export default function App() {

    const [keyword, setKeyword] = useState('');
    const [reseptit, setReseptit] = useState([]);

    const getReseptit = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
        .then(response => response.json())
        .then(responseJson => setReseptit(responseJson.meals))
        .catch(error => { 
            Alert.alert('Error', error); 
        });    
    }

    const listSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                backgroundColor: "#CED0CE",
                margin: 5
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <FlatList 
			style={{marginBottom:10}} 
            data = {reseptit} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({item}) => 
                <View>
					<Text style={{fontSize: 18, fontWeight:'600', margin:10}} >{item.strMeal}</Text>
					<Image style={styles.image} source={{uri: item.strMealThumb}} />
                </View>}
            ItemSeparatorComponent = {listSeparator} 
            /> 
				<TextInput 
				style={{fontSize: 18, width: 200}} 
				placeholder='keyword' 
				onChangeText={text => setKeyword(text)} 
				/>
				<Button title="Find" onPress={getReseptit} />
        </View>
		
    );
}

// Tyyli

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
		margin:15,
		alignItems: 'center',
        justifyContent: 'space-evenly',
    },
	image : {
        minWidth:250,
        height: 150,
    },
});
