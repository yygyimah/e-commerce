import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkout({navigation}) {
    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const checkoutHandler = async () => {
        if (name.trim().length === 0) {
            alert("Please enter your name")
        }else if (address.trim().length === 0) {
            alert("Please enter your address")
        }else if (phone.trim().length === 0) {
            alert("Please enter your phone number")
        }else if (email.trim().length === 0 || !isEmailValid(email)) {
            alert("Invalid email address")
        }else {
            Alert.alert(
                "Success",
                'Checkout was successful',
                [
                    { text: "OK", onPress: () => console.log("") }
                ]
            );

            await AsyncStorage.setItem('cart', JSON.stringify([]))

            navigation.goBack()
        }
    }

    const isEmailValid = (address) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(address).toLowerCase());
    }

    const alert = (message) => {
        Alert.alert(
            "Validation Error",
            message,
            [
                { text: "OK", onPress: () => console.log("") }
            ]
        );
    }



    return (
        <View style={styles.container}>

            <StatusBar style="light" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name."
                    placeholderTextColor="#003f5c"
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone."
                    placeholderTextColor="#003f5c"
                    onChangeText={(phone) => setPhone(phone)}
                />
            </View>

             <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Address."
                    placeholderTextColor="#003f5c"
                    onChangeText={(address) => setAddress(address)}
                />
            </View>


            <TouchableOpacity style={styles.loginBtn} onPress={checkoutHandler}>
                <Text style={styles.loginText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#002171",
    },
    loginText: {
        color: '#fff'
    }
});