import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {useState} from "react";

export default function App() {

    const [name, setName] = useState('kwame')
    const [age, setAge] = useState(10)

    const clickHandler = () => {
        setName('Alex freeman')
    }

    return (
       <View style={styles.container}>
           <Text>Enter name:</Text>
           <TextInput
               style={styles.input}
               placeholder='eg. John Doe'
               onChangeText={(val) => {setName(val)}}
           />

           <Text>Enter age:</Text>
           <TextInput
               style={styles.input}
               placeholder='eg. 10'
               onChangeText={(val) => {setAge(val)}}
               keyboardType='numeric'
           />
           <Text>name: {name}, age: {age}</Text>

       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200
    }
})