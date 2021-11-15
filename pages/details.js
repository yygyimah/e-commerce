import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView, Alert,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetails({route}) {

    const addToCart = async (prod) => {
        let cartItems = [];

        try {
            let cart = await AsyncStorage.getItem('cart')

            if (cart !== null) {

                cart = JSON.parse(cart);

                let existingProduct = cart.find(p => p.product.id === prod.id)

                if (existingProduct) {
                    existingProduct.quantity = existingProduct.quantity + 1

                    cart.forEach((c, index) => {
                        if (c.product.id === existingProduct.product.id) {
                            cart[index] = existingProduct
                        }
                    })

                    cartItems = [...cart]

                }else {
                    cartItems = [...cart, {quantity: 1, product: prod}]
                }

            }else {
                cartItems = [{quantity: 1, product: prod}]
            }


            await AsyncStorage.setItem('cart', JSON.stringify(cartItems))

            Alert.alert(
                "Cart",
                "Product added to cart",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

        }catch (e) {
            console.log('error adding to cart', e)
        }


    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems:'center', marginHorizontal:30}}>
                    <Image style={styles.productImg} source={{uri:route.params.product.image}}/>
                    <Text style={styles.name}>{route.params.product.name}</Text>
                    <Text style={styles.price}>GH₵ {route.params.product.price}</Text>

                </View>
                <View style={styles.starContainer}>
                    <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
                    <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
                    <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
                    <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
                    <Image style={styles.star} source={{uri:"https://img.icons8.com/color/40/000000/star.png"}}/>
                </View>
                <View style={styles.contentColors}>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00BFFF"}]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF1493"}]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#00CED1"}]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#228B22"}]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#20B2AA"}]}></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnColor, {backgroundColor:"#FF4500"}]}></TouchableOpacity>
                </View>
                <View style={styles.contentSize}>
                    <TouchableOpacity style={styles.btnSize}><Text>S</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnSize}><Text>M</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnSize}><Text>L</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btnSize}><Text>XL</Text></TouchableOpacity>
                </View>
                <View style={styles.separator}/>
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity style={styles.addToCartBtn} onPress={()=> addToCart(route.params.product)}>
                        <Text style={styles.addToCartText}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    productImg:{
        width:200,
        height:200,
    },
    name:{
        fontSize:28,
        color:"#696969",
        fontWeight:'bold'
    },
    price:{
        marginTop:10,
        fontSize:18,
        color:"green",
        fontWeight:'bold'
    },

    star:{
        width:40,
        height:40,
    },
    btnColor: {
        height:30,
        width:30,
        borderRadius:30,
        marginHorizontal:3
    },
    btnSize: {
        height:40,
        width:40,
        borderRadius:40,
        borderColor:'#778899',
        borderWidth:1,
        marginHorizontal:3,
        backgroundColor:'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    contentColors:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    contentSize:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    separator:{
        height:2,
        backgroundColor:"#eeeeee",
        marginTop:20,
        marginHorizontal:30
    },
    addToCartBtn: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#002171",
    },
    addToCartText:{
        color: "#FFFFFF",
        fontSize:20,
    },
    addToCarContainer:{
        marginHorizontal:30
    }
});