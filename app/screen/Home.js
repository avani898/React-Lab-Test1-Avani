import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateFuelData } from '../store/fuelAction';

const Home = (props) => {
    const data = useSelector(state => state.data);
    const userMaxAllowance = useSelector(state => state.userMaxAllowance);
    const dispatch = useDispatch();

    const removeData = (item) => {
        let finalData = data.filter((obj) => obj.id !== item.id)
        let finalBalance = userMaxAllowance + item.price;
        dispatch(updateFuelData({
            finalData,
            finalBalance
        }))
        Alert.alert("Removed successfully")
    }

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.mainStyle}>
                <View>
                    <Text style={styles.text}>Fuel Type: {item.type}</Text>
                    <Text style={styles.text}>Fuel Used: {item.used}</Text>
                </View>
                <View>
                    <Text style={styles.text}>Price: {item.price}</Text>
                    <TouchableOpacity onPress={() => removeData(item)}>
                        <Text style={[styles.text, { color: 'red' }]}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.formWrapper}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Fuel')} style={styles.btn}>
                <Text style={styles.btnText}>Create List</Text>
            </TouchableOpacity>
            <Text style={styles.label} onPress={() => navigation.navigate('Fuel')}>User Allowance Remaining: {userMaxAllowance}</Text>
            <FlatList
                data={data}
                renderItem={_renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        display: "flex",
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    label: {
        marginVertical: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    mainStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Home;