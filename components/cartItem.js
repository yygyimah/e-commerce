import React from "react";
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";

export default function CartItem({cart, increaseQuantity, reduceQuantity}) {
    let {width} = Dimensions.get("window")


    return (
        <View style={{width:width-20,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:1, borderColor:"#cccccc", paddingBottom:5}}>
            <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: cart.product.image}} />
            <View style={styles.text}>
                <View>
                    <Text style={styles.product}>{cart.product.name}</Text>
                    <Text style={styles.price}>GH₵ {cart.product.price}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.subtotal}>Subtotal - GH₵ {cart.quantity*cart.product.price}</Text>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={()=> reduceQuantity(cart.product.id)}>
                            <Icon type='font-awesome' name="minus" size={18} color={"#002171"} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{cart.quantity}</Text>
                        <TouchableOpacity onPress={()=> increaseQuantity(cart.product.id)}>
                            <Icon name="plus" type='font-awesome' size={18} color={"#002171"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    text: {
        flex:1,
        padding:10
    },
    quantity: {
        paddingHorizontal:8,
        fontWeight:'bold',
        fontSize:16
    },
    product: {
        fontWeight:"bold",
        fontSize:16,
        marginTop: 10
    },
    price: {
        fontSize:14,
        marginTop: 10
    },
    subtotal: {
        fontWeight:'bold'
        ,color:"#000",
        fontSize:16,
        marginTop: 10
    },
    icons: {
        flexDirection:'row',
        alignItems:'center'
    }
})