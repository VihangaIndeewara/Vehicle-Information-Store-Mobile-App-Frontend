import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function SignIn({navigation}) {
    const [yourName, setyourName] = useState("");
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [retypePassword, setretypePassword] = useState("");


    const printStates = async () => {
        if (password == retypePassword) {
            try {
                const response = await fetch('http://192.168.1.103:4000/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        realname: yourName,
                        usename: userName,
                        password: password,
                    }),
                });

                const json = await response.json();
                alert(json.message)
                navigation.navigate("TempSearch")

            } catch (error) {
                console.error(error);
                alert("Try Again Latter")
            }
        }else{
            alert("Password and Retype password are Dismatch");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textContainerSignIn}>Sign In</Text>
            <TextInput style={styles.placeHolderContainerYourName} placeholder='Your Name' value={yourName} onChangeText={(e) => { setyourName(e) }} />
            <TextInput style={styles.placeHolderContainerUserName} placeholder='Username' value={userName} onChangeText={(e) => { setuserName(e) }} />
            <TextInput style={styles.placeHolderContainerPassword} placeholder='Password' value={password} onChangeText={(e) => { setpassword(e) }} />
            <TextInput style={styles.placeHolderContainerRetypePassword} placeholder='Retype Password' value={retypePassword} onChangeText={(e) => { setretypePassword(e) }} />
            <TouchableOpacity
                style={styles.SignInBtnContainer}
                onPress={printStates}
            >
                <Text style={{ color: '#ffff', fontSize: 20 }}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainerSignIn: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Cochin",
        color: "#000000"
    },
    placeHolderContainerYourName: {
        marginTop: '10%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 20
    },
    placeHolderContainerUserName: {
        marginTop: '5%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 20
    },
    placeHolderContainerPassword: {
        marginTop: '5%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 20
    },
    placeHolderContainerRetypePassword: {
        marginTop: '5%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 20
    },
    SignInBtnContainer: {
        width: '60%',
        padding: 5,
        backgroundColor: "#1300FF",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        borderRadius: 20
    }
});
