import React from "react";
import {View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function Home() {
    return (
        <View>
            <StatusBar style="light" />
            <Text>Home</Text>
        </View>
    )
}