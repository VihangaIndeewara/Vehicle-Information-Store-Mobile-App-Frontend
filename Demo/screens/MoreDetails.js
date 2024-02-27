import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import { TextArea, Box, Center, NativeBaseProvider } from "native-base";

export default function MoreDetails({ route, navigation }) {
    const [file, setFile] = useState("");//thumbnail-image.jpg

    const [vehicalNumber, setvehicalNumber] = useState("");
    const [vehicalName, setvehicalName] = useState("");
    const [location, setlocation] = useState("");
    const [otherDetails, setotherDetails] = useState("");

    const [number, setNumber] = useState("Vehical Number  :");
    const [name, setName] = useState("Vehical Name      :");
    const [place, setPlace] = useState("Vehical Location :");

    const updateVehicalDetails = async () => {
        const vehical = {
            vehicalNumber: vehicalNumber,
            otherDetails: otherDetails
        }

        try {
            const response = await fetch('http://192.168.1.103:4000/vehical/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehical),
            });

            const json = await response.json();
            alert(json.message)
            navigation.navigate("TempSearch")
        } catch (error) {
            console.error(error);
            alert("Try Again Latter")
        }
    }

    const deleteVehicalDetails = async () => {
        try {
            const response = await fetch('http://192.168.1.103:4000/vehical/'+vehicalNumber, {
                method: 'DELETE',
            });

            const json = await response.json();
            alert(json.message)
            navigation.navigate("TempSearch")
        } catch (error) {
            console.error(error);
            alert("Try Again Latter")
        }
    }

    useEffect(() => {
        setFile(route.params.obj.vehicalImage)
        setvehicalNumber(route.params.obj.vehicalNumber);
        setvehicalName(route.params.obj.vehicalName);
        setlocation(route.params.obj.location);
    });

    return (
        <NativeBaseProvider style={styles.body}>
            <View style={styles.ImageSections}>
                <View>
                    <Image source={{ uri: file }} style={styles.images} />
                </View>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.subContainerText}>
                    <Text style={styles.Text}>{number}{vehicalNumber}</Text>
                    <Text style={styles.Text}>{name}{vehicalName}</Text>
                    <Text style={styles.Text}>{place}{location}</Text>
                </View>

                <Box alignItems="center" w="100%" marginTop={2}>
                    <TextArea h={40} w="100%" maxW="300" value={otherDetails} onChangeText={(e) => { setotherDetails(e) }} />
                </Box>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={deleteVehicalDetails}
                    >
                        <Text style={{ color: '#ffff', fontSize: 20 }}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnUpdate}
                        onPress={updateVehicalDetails}
                    >
                        <Text style={{ color: '#ffff', fontSize: 20 }}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 170,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    subContainerText: {
        marginTop: 10
    },
    Text: {
        marginTop: 5
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 2
    },
    btnSection: {
        width: 200,
        height: 30,
        backgroundColor: '#1300FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: '#ffff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    subContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeHolderContainer: {
        marginTop: '2%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 20

    },
    btnUpdate: {
        width: '30%',
        padding: 5,
        backgroundColor: "#1300FF",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        borderRadius: 20,
        marginLeft: 5
    },
    btnDelete: {
        width: '30%',
        padding: 5,
        backgroundColor: "#FF0A16",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        borderRadius: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
});