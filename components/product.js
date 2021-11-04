import React from "react";
import {Text, StyleSheet, View} from "react-native";
import { Card,Icon } from 'react-native-elements';

export default function Product({product, addToCartHandler}) {
    return (
        <Card>
            <Card.Image source={{uri: product.image}}/>
            <Text style={{marginBottom: 10, marginTop: 20 }}>
                {product.name}
            </Text>
            <Text style={styles.price}>
                GH₵ {product.price}
            </Text>
            <View style={styles.btns}>
                <Icon
                    raised
                    type='font-awesome'
                    name='money'
                    color='#002171' />
                <Icon
                    onPress={() => addToCartHandler(product.id)}
                    raised
                    type='font-awesome'
                    name='cart-plus'
                    color='#002171' />
            </View>

        </Card>
    )
}

const styles = StyleSheet.create({
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    btns: {
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "center"
    }
});

