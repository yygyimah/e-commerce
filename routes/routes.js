import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../pages/login";
import Home from "../pages/home";
import Details from "../pages/details";
import {Button} from "react-native";
import Cart from "../pages/cart";

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({navigation}) => ({
                        title: 'Home',
                        headerStyle: {
                            backgroundColor: '#002171',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerLeft: () => null,
                        headerBackVisible: false,
                    })}

                />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        title: 'Cart',
                        headerStyle: {
                            backgroundColor: '#002171',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },


                    }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}