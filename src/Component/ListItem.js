import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions, TouchableOpacity,
} from "react-native";

const {width: WIDTH} = Dimensions.get('window')

const ListItem = ({record, navigate}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>Patient: {record.patient}</Text>
            <Text style={styles.details}>Doctor: {record.doctor}</Text>
            <Text style={styles.details}>Date: {record.date}</Text>
            <View style={styles.btnView}>
                <TouchableOpacity
                    style={styles.detailsBtn}
                    onPress={navigate}
                >
                    <Text style={styles.btnText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 10,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        flex:1,
        flexDirection: 'column',
    },
    title: {
       fontSize: 22
    },
    details: {
        fontSize: 16,
    },
    btnView:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    detailsBtn: {
        backgroundColor: '#fff',
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 11
    }
});


export default ListItem