import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker'
import { addData } from '../store/fuelAction';

const Fuel = (props) => {
    const dispatch = useDispatch();
    const fuelData = useSelector(state => state.fuelData);
    const userMaxAllowance = useSelector(state => state.userMaxAllowance);
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState(fuelData.map((obj) => { return { label: obj.fuelType, value: obj.pricePerLiter } })[0]);

    const submitData = () => {
        let total = parseFloat(inputValue) * item.value;
        if (total < userMaxAllowance) {
            let data = {
                id: Date.now() + Math.random(),
                type: item.label,
                price: total,
                used: parseFloat(inputValue)
            }
            let finalBalance = userMaxAllowance - total;
            dispatch(addData({
                finalBalance,
                data
            }))
            alert("Added successfully")
            props.navigation.navigate("Home")
        } else {
            alert("Don't have balance")
        }
    }

    return (
        <View style={styles.formWrapper}>
            <DropDownPicker
                items={fuelData.map((obj) => { return { label: obj.fuelType, value: obj.pricePerLiter } })}
                defaultIndex={0}
                containerStyle={{ height: 40 }}
                onChangeItem={item => setItem(item)}
            />
            <TextInput
                placeholderTextColor={"black"}
                placeholder='Enter Liters/ Charge unit here'
                style={styles.textInputStyle}
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(val) => setInputValue(val)}
            />
            <TouchableOpacity onPress={() => submitData()} style={styles.btn}>
                <Text style={styles.btnText}>Create</Text>
            </TouchableOpacity>
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
    textInputStyle: {
        marginVertical: 20,
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10
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
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default Fuel;