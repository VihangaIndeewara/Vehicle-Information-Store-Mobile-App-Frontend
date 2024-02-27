import React, { Fragment, Component, useState,useEffect } from 'react';
import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TextArea, Box, Center, NativeBaseProvider } from "native-base";
import DatePicker from 'react-native-date-picker';

export default function SaveVehical() {
    const [file, setFile] = useState("");//thumbnail-image.jpg

    const [vehicalNumber, setvehicalNumber] = useState("");
    const [vehicalName, setvehicalName] = useState("");
    const [location, setlocation] = useState("");
    const [addDate, setaddDate] = useState("");
    const [otherDetails, setotherDetails] = useState("");

    const [open,setOpen] = useState(false);
    const [date,setDate] = useState(new Date());

    const saveCar= async () =>{
        const vehical ={
            vehicalNumber :vehicalNumber,
            vehicalName : vehicalName,
            location : location,
            vehicalImage : file,
            vehicalAddDate : date,
            otherDetails : otherDetails
        }

        try {
            const response = await fetch('http://192.168.1.103:4000/vehical/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehical),
            });

            const json = await response.json();
            alert(json.message)
        } catch (error) {
            console.error(error);
            alert("Try Again Latter")
        }
    }

    const openGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };


        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = response.assets[0].uri ;
                setFile(source);
            }
        });

    }

    return (
        <NativeBaseProvider style={styles.body}>
            <View style={styles.ImageSections}>
                <View>
                    <Image source={{uri:file}} style={styles.images} />
                </View>
            </View>

            <View style={styles.btnParentSection}>
                <TouchableOpacity onPress={openGallery} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Choose Vehical Image</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.subContainer}>
                <TextInput style={styles.placeHolderContainer} placeholder='Vehical Number' value={vehicalNumber} onChangeText={(e) => { setvehicalNumber(e) }} />
                <TextInput style={styles.placeHolderContainer} placeholder='Vehical Name' value={vehicalName} onChangeText={(e) => { setvehicalName(e) }} />
                <TextInput style={styles.placeHolderContainer} placeholder='Location' value={location} onChangeText={(e) => { setlocation(e) }} />

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

                <Box alignItems="center" w="100%" marginTop={2}>
                    <TextArea h={20} placeholder="Other Details" w="75%" maxW="300" value={otherDetails} onChangeText={(e) => { setotherDetails(e) }}/>
                </Box>

                <TouchableOpacity
                    style={styles.LoginBtnContainer}
                    onPress={saveCar}
                >
                    <Text style={{ color: '#ffff', fontSize: 20 }}>SAVE</Text>
                </TouchableOpacity>
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
        width: 120,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
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
    DataPickerBtnContainer: {
        marginTop: '2%',
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
    LoginBtnContainer: {
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