import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import firebase from '../config/firebase';

const SignUp = (props) => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState('')

    const onTextChange = (val, prop) => {
        prop(val);
    }

    const addUser = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter correct details.')
        } else {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: displayName
                    })
                    console.log('User account created.')
                    setDisplayName('');
                    setEmail('');
                    setPassword('');
                    setLoading('');
                    props.navigation.navigate('Login')
                })
                .catch(error => {
                    alert(error.message)
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
                placeholder="Name"
                value={displayName}
                placeholderTextColor={"black"}
                onChangeText={(val) => onTextChange(val, setDisplayName)}
            />
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
            <TouchableOpacity onPress={() => addUser()} style={styles.btn}>
                <Text style={styles.btnText}>Signup</Text>
            </TouchableOpacity>
            <Text
                style={styles.redirectText}
                onPress={() => props.navigation.navigate('Login')}>
                Already have account ? Signin
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

export default SignUp;