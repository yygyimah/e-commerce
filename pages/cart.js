import React, {useState, useEffect} from "react";
import {View, FlatList, StyleSheet, Alert} from "react-native";
import {StatusBar} from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../components/cartItem";
import {FAB} from "react-native-elements";

export default function Cart({navigation}) {

    const [cart, setCart] = useState([])

    const loadCart = async () => {
        try {
            let cart = await AsyncStorage.getItem('cart')
            setCart(JSON.parse(cart).filter(c => c.quantity > 0))
        }catch (e) {
            console.log(e)
        }
    }


    const increaseQuantity = async (productId) => {

        cart.forEach((c, index) => {
            if (c.product.id === productId) {
                cart[index].quantity += 1;
            }
        })

        setCart(cart.filter(c => c.quantity > 0))

        await AsyncStorage.setItem('cart', JSON.stringify(cart))


    }

    const reduceQuantity = async (productId) => {
        cart.forEach((c, index) => {
            if (c.product.id === productId) {
                if (cart[index].quantity === 1){
                    cart[index].quantity = 0;
                }else {
                    cart[index].quantity -= 1;
                }
            }
        })


        setCart(cart.filter(c => c.quantity > 0))

        await AsyncStorage.setItem('cart', JSON.stringify(cart))
    }

    const checkout = () => {
        if (cart.length === 0) {
            Alert.alert(
                "Oops",
                "Sorry no items in your cart",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return
        }

        navigation.push('Checkout')
    }

    useEffect(async () => {
        await loadCart()
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>

            <FlatList
                keyExtractor={(item, index) => index+1}
                data={cart}
                renderItem={({item}) => (
                    <CartItem cart={item} increaseQuantity={increaseQuantity} reduceQuantity={reduceQuantity}/>
                )}
            />

            <FAB title="Checkout" placement='right' size='small' color='#002171' onPress={checkout} />

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});