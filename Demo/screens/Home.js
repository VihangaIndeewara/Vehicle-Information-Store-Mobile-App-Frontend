import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
    return (
        <View >
            <View style={styles.subContainer_1}>
                <TouchableOpacity style={styles.appButtonContainer} onPress={()=>{navigation.navigate("Login")}}>
                    <Text style={{color:'#fcfffe',alignSelf:"center",fontSize:15}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.appButtonContainer} onPress={()=>{navigation.navigate("SignIn")}}>
                    <Text style={{color:'#fcfffe',alignSelf:"center",fontSize:15}}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.appImgContainer}
                source={require('../screens/img/vehicalSell.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer_1: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginLeft: 15,
        marginTop: 10,
        
    },
    appButtonContainer: {
        backgroundColor: "#1300FF",
        borderRadius: 10,
    
        borderColor:"#000000",
        borderWidth: 1,
        marginLeft:"1%",
        marginRight:"2%",
        width:"20%",
        height:25
    },
    appImgContainer: {
        marginTop: '60%',
        width: '100%',
        height: '60%',
    }
});