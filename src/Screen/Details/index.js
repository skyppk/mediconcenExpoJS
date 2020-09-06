import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    SafeAreaView,
    StatusBar,
    ScrollView
} from "react-native";

import Service from "../../Services";
import ListItem from "../../Component/ListItem";

const {height: Height} = Dimensions.get('window')


class DetailsScreen extends React.Component {
    constructor() {
        super();
    }


    render() {
        const {details} = this.props.route.params;

        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.text}>Doctor : {details.doctor}</Text>
                        <Text style={styles.text}>Patient : {details.patient}</Text>
                        <Text style={styles.text}>Diagnosis : {details.diagnosis}</Text>
                        <Text style={styles.text}>Medication : {details.medication}</Text>
                        <Text style={styles.text}>Consultation Fee : ${details.fee}</Text>
                        <Text style={styles.text}>Date : {details.date.split('T')[0]} {details.date.split('T')[1].split('.')[0]}</Text>
                        <Text style={styles.text}>Follow-up : {details.followup}</Text>
                    </ScrollView>

                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#f8f1f1',
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 30,
        // height: Height - 855,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },
    scroll:{
        marginTop: 10 ,
        marginBottom: 10,
    },
    text: {
        fontSize: 23,
        fontFamily: 'Avenir',
        padding: 10,
    }
});


export default DetailsScreen