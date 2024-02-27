import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, LogBox } from "react-native";
import { ListItem } from "react-native-elements";
import filter from "lodash.filter";
import { Searchbar } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

// const DATA = [
//     {
//         vehicalNumber: "1",
//         vehicalName: "Benz",
//         location: "Kelaniya",
//         vehicalImage: "temparyImage",
//         vehicalAdddate: "2022-10-10",
//         otherDetails: "aaaaaaaaaaaaaa",
//     },
//     {
//         vehicalNumber: "2",
//         vehicalName: "Audi",
//         location: "Kelaniya",
//         vehicalImage: "temparyImage",
//         vehicalAdddate: "2545-10-10",
//         otherDetails: "aavvvvvaaa",
//     },
//     {
//         vehicalNumber: "3",
//         vehicalName: "Benz",
//         location: "Colombo",
//         vehicalImage: "temparyImage",
//         vehicalAdddate: "2022-10-10",
//         otherDetails: "rrrrrr",
//     },
//     {
//         vehicalNumber: "4",
//         vehicalName: "Benz",
//         location: "Galle",
//         vehicalImage: "temparyImage",
//         vehicalAdddate: "2022-10-10",
//         otherDetails: "aeeeeeaa",
//     },
// ];

export default function TempSearch({ navigation }) {
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [arrayholder, setArrayholder] = useState();

    const [tempData, setTempData] = useState({});

    searchFunction = (text) => {
        const updatedData = arrayholder.filter((vehical) => {
            const vehical_location = `${vehical.location.toUpperCase()})`;
            const vehical_data = text.toUpperCase();
            return vehical_location.indexOf(vehical_data) > -1;
        });
        setData(updatedData);
        setSearchValue(text);
    };

    // const loadVehicalData = () => {
    //     fetch('http://192.168.1.103:4000/vehical/')
    //         .then((response) => response.json())
    //         .then((json) => setData(json));
    // };
    const loadVehicalData = async () => {
        try {
            const response = await fetch('http://192.168.1.103:4000/vehical/', {
                method: 'GET'
            });

            const json = await response.json();
            setData(json);
            setArrayholder(json);
        } catch (error) {
            console.error(error);
            alert("Try Again Latter")
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(['Method has been deprecated']);
        if (isFocused) {
            loadVehicalData();
        }
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Type Location"
                    lightTheme
                    value={searchValue}
                    onChangeText={(text) => searchFunction(text)}
                />

                <TouchableOpacity style={styles.DataPickerBtnContainer} onPress={() => {
                    setOpen(true);
                }}>
                    <Image style={styles.DataPickerImgContainer}
                        source={require('../screens/img/calendar.png')}
                    />
                </TouchableOpacity>

                <DatePicker modal open={open} date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />

                <TouchableOpacity style={styles.addBtnContainer} onPress={() => { navigation.navigate("SaveVehical") }}>
                    <Image style={styles.addBtnImageContainer}
                        source={require('../screens/img/plus.png')}
                    />
                </TouchableOpacity>

            </View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{
                        borderWidth: 1, marginBottom: '5%', padding: 5, marginVertical: 8,
                        marginHorizontal: 16,
                    }} onPress={() => { navigation.navigate("MoreDetails",{obj:item}) }}>
                        <View style={styles.flatListContainer}>
                            <View>
                                <Image source={{ uri: item.vehicalImage }} style={styles.flatListImage} />
                            </View>
                            <View style={styles.flatListText}>
                                <Text  >{item.location}</Text>
                                <Text  >{item.vehicalNumber}</Text>
                                <Text  >{item.vehicalName}</Text>
                                <Text  >{item.vehicalAddDate}</Text>
                                <Text  >{item.otherDetails}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

// onPress={() => {
//     navigation.navigate('VehicleDetail', {vehicle: item});
//   }}




                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2,
    },
    searchContainer: {
        flexDirection: "row",
    },
    searchBar: {
        width: "65%",
    },
    datePickerContainer: {
        marginTop: 10,
    },
    DataPickerBtnContainer: {
        width: '17%',
        backgroundColor: "#ffffff",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    DataPickerImgContainer: {
        width: '40%',
        height: '60%',
    },
    addBtnContainer: {
        width: '17%',
        backgroundColor: "#ffffff",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnImageContainer: {
        width: '40%',
        height: '60%',
    },
    flatListContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    flatListImage: {
        width: 100,
        height: 90,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    flatListText: {
        marginLeft: 10
    }
});
