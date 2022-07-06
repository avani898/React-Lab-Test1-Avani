import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import firebase from '../config/firebase';
import { useDispatch } from 'react-redux';
import { setFuelData } from '../store/fuelAction';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState('')

    useEffect(() => {
        let fuelData = [
            {
                fuelType: "Petrol",
                pricePerLiter: 30
            },
            {
                fuelType: "Diesel",
                pricePerLiter: 40
            },
            {
                fuelType: "Battery Charge",
                pricePerLiter: 10
            },
        ]
        AsyncStorage.setItem("fuelData", JSON.stringify(fuelData))
        AsyncStorage.setItem("userMaxAllowance", JSON.stringify(300))
    }, [])

    const onTextChange = (val, prop) => {
        prop(val);
    }

    const signIn = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter correct details.')
        } else {
            setLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    setEmail('');
                    setPassword('');
                    setLoading('');
                    AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then((value) => {
                        const data = Object.fromEntries(value);
                        let finalData = {
                            fuelData: JSON.parse(data.fuelData),
                            userMaxAllowance: parseInt(data.userMaxAllowance)
                        }
                        dispatch(setFuelData(finalData))
                        props.navigation.navigate('Home')
                    })

                })
                .catch(error => {
                    alert(error.message)
                    setEmail('');
                    setPassword('');
                    setLoading('');
                })
        }
    }

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        )
    }

    return (
        <View style={styles.formWrapper}>
            <TextInput
                style={styles.formField}
                placeholder="Email"
                value={email}
                placeholderTextColor={"black"}
                autoCapitalize={false}
                onChangeText={(val) => onTextChange(val, setEmail)}
            />
            <TextInput
                style={styles.formField}
                placeholder="Password"
                value={password}
                placeholderTextColor={"black"}
                onChangeText={(val) => onTextChange(val, setPassword)}
                maxLength={20}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => signIn()} style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <Text
                style={styles.redirectText}
                onPress={() => props.navigation.navigate('SignUp')}>
                Don't have account ? Signup
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: 30,
        backgroundColor: '#f4f4f4',
        flexDirection: "column",
    },
    btn: {
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    formField: {
        width: '100%',
        alignSelf: "center",
        borderColor: "#444",
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingBottom: 20,
    },
    redirectText: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 24,
        fontSize: 20
    },
    loading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default LogIn;