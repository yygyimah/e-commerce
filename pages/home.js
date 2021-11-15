import React, {useState} from "react";
import {SafeAreaView, FlatList, Image, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from "expo-status-bar";
import Product from "../components/product";
import { FAB } from 'react-native-elements';

export default function Home({navigation}) {

    const [products, setProducts] = useState([
        {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            name: 'Product 1',
            size: ["XL", "L", "M"],
            colors: [],
            price: 10
        },
        {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            name: 'Product 2',
            size: ["S", "M", "L"],
            colors: [],
            price: 20
        },
        {
            id: 3,
            image: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            name: 'Product 2',
            size: ["L", "XL"],
            colors: [],
            price: 30
        },
        {
            id: 4,
            image: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            name: 'Product 2',
            size: [],
            colors: ["S","M", "L", "XL"],
            price: 40
        },
        {
            id: 5,
            image: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
            name: 'Product 2',
            size: ["S", "XL"],
            colors: [],
            price: 50
        },
    ])

    const addToCart = async (productId) => {
        let cartItems = [];
        let product = products.find(p => p.id === productId);

        try {
            let cart = await AsyncStorage.getItem('cart')

            if (cart !== null) {

                cart = JSON.parse(cart);

                let existingProduct = cart.find(p => p.product.id === productId)

                if (existingProduct) {
                    existingProduct.quantity = existingProduct.quantity + 1

                    cart.forEach((c, index) => {
                        if (c.product.id === existingProduct.product.id) {
                            cart[index] = existingProduct
                        }
                    })

                    cartItems = [...cart]

                }else {
                    cartItems = [...cart, {quantity: 1, product: product}]
                }

            }else {
                cartItems = [{quantity: 1, product: product}]
            }

          
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems))

        }catch (e) {
            console.log('error adding to cart', e)
        }


    }

    const viewProductDetails = (product) => {
        console.log(product)
        navigation.navigate('ProductDetails', {product: product})
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                keyExtractor={(item) => item.id}
                data={products}
                renderItem={({item}) => (
                    <Product product={item} addToCartHandler={addToCart} viewProductDetailsHandler={viewProductDetails}/>
                )}
            />
            <FAB title="Cart" placement='right' size='small' color='#002171' onPress={() => navigation.navigate('Cart')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});