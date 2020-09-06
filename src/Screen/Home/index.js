import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Button,
    Alert,
    ScrollView
} from "react-native";

import Service from "../../Services";
import ListItem from "../../Component/ListItem";
import setAuthorization from "../../Services/author";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const {width: WIDTH} = Dimensions.get('window')


class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            consultationRecords: [],
            groupRecords:[],
            isRefreshing: false,
            // isDaily: true,
            // displayType: 'Daily'
            isDaily: false,
            displayType: 'Monthly'
        }


        this.getRecordsCallback()

    }


    getRecordsCallback = () =>  Service.getAllRecords(response => {
            this.setState({consultationRecords: response.data.data}, () => this.grouprecords(this.state.displayType))
        }, err => {
            Alert.alert(
                "Token expired",
                "Please login again !",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setAuthorization()
                            this.props.navigation.navigate('Login')
                        }
                    }
                ]
            )
        }
    )

    seeDetails = (item) => {
        this.props.navigation.navigate('Details',{details: item})
    }

    grouprecords = (type) => {
        switch (type){
            case 'Monthly':
                const groups = this.state.consultationRecords.reduce((groups, records) => {
                    const date = records.date.split('-')[0] + '-'  + records.date.split('-')[1]
                    if (!groups[date]) {
                        groups[date] = []
                    }
                    groups[date].push(records)
                    return groups
                },{})

                const groupArrays = Object.keys(groups).map((date) => {
                    return {
                        date,
                        records: groups[date]
                    }
                })

                this.setState({groupRecords: groupArrays, isDaily: false, displayType: 'Monthly'})
                break
            case 'Weekly':
                this.setState({ isDaily: false, displayType: 'Weekly'})
                break
            default:
                this.setState({isDaily: true, displayType: 'Daily'})
        }
    }



    render() {

        let recordList;

        if (this.state.isDaily){
            recordList = <FlatList
                style={styles.list}
                // contentContainerStyle={{paddingBottom: 20}}
                data={this.state.consultationRecords}
                onRefresh={this.getRecordsCallback}
                refreshing={this.state.isRefreshing}
                renderItem={({item}) => (
                        <ListItem
                            record={item}
                            navigate={() => this.seeDetails(item)}
                        />
                        )
                }
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <View style={{flex: 1, flexDirection: "row",  alignItems: "center",justifyContent: 'center', backgroundColor: '#be5959'}}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: 'center',
                                borderRadius: 5,
                                borderColor: "grey",
                                borderWidth: 2,
                                backgroundColor: "#fff",
                                width: "80%",
                                padding: 10,
                                // marginTop: 20
                            }}>
                            <Text>{'No records for the clinic now , pull down to refresh !'}</Text>
                        </View>
                    </View>
                }
            />
        } else {
            recordList = <ScrollView>
                {this.state.groupRecords.map((item,key) =>
                     <Text>hihi</Text>
                )}
                {/*<FlatList*/}
                {/*    style={styles.list}*/}
                {/*    // contentContainerStyle={{paddingBottom: 20}}*/}
                {/*    data={this.state.consultationRecords}*/}
                {/*    onRefresh={this.getRecordsCallback}*/}
                {/*    refreshing={this.state.isRefreshing}*/}
                {/*    renderItem={({item}) => (*/}
                {/*        <ListItem*/}
                {/*            record={item}*/}
                {/*            navigate={() => this.seeDetails(item)}*/}
                {/*        />*/}
                {/*    )*/}
                {/*    }*/}
                {/*/>*/}
            </ScrollView>
        }

        return(
            <SafeAreaView style={styles.container}>

                <View style={styles.topBtnView}>
                    <Button
                        title={'Monthly'}
                        onPress={() => this.grouprecords('Monthly')}
                    />
                    <Button
                        title={'Weekly'}
                        onPress={() => this.grouprecords('Weekly')}
                    />
                    <Button
                        title={'Daily'}
                        onPress={() => this.grouprecords()}
                    />
                    <Button
                        title={'Logout'}
                        onPress={()=>{
                            setAuthorization()
                            this.props.navigation.navigate('Login')
                        }}
                    />
                </View>

                {/*{recordList}*/}

                <FlatList
                    style={styles.list}
                    nestedScrollEnabled={true}
                    // contentContainerStyle={{paddingBottom: 20}}
                    data={this.state.isDaily ? this.state.consultationRecords : this.state.groupRecords}
                    onRefresh={this.getRecordsCallback}
                    refreshing={this.state.isRefreshing}
                    listKey={(item,index) => 'D' + index.toString()}
                    keyExtractor={(item, index) => this.state.isDaily ? item.id.toString() : 'D' + index.toString()}
                    renderItem={({item}) => (

                        this.state.isDaily ?
                            <ListItem
                                record={item}
                                navigate={() => this.seeDetails(item)}
                            /> :
                            <View style={styles.groups}>
                                <Text>{item.date}</Text>
                                {item.records.map((record, key) =>
                                        // console.log(record),
                                    <ListItem
                                        record={record}
                                        navigate={() => this.seeDetails(record)}
                                    />


                                    // <FlatList
                                    //     style={styles.insideList}
                                    //     data={item.records}
                                    //     keyExtractor={(item2, index) => index.toString()}
                                    //     listKey={(item2,index) => 'D' + index.toString()}
                                    //     renderItem={({getrecord}) => (
                                    //         <View style={{flex:1,
                                    //             flexDirection: 'column',}}>
                                    //             <Text>hi {getrecord}</Text>
                                    //             <Text>hi {getrecord}</Text>
                                    //             <Text>hi {getrecord}</Text>
                                    //             <Text>hi {getrecord}</Text>
                                    //
                                    //         </View>
                                    //
                                    //         // <ListItem
                                    //         //     record={getrecord}
                                    //         //     navigate={() => this.seeDetails(getrecord)}
                                    //         // />
                                    //     )}
                                    // />
                                )}



                            </View>
                        )
                    }

                    ListEmptyComponent={
                        <View style={{flex: 1, flexDirection: "row",  alignItems: "center",justifyContent: 'center', backgroundColor: '#be5959'}}>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    borderColor: "grey",
                                    borderWidth: 2,
                                    backgroundColor: "#fff",
                                    width: "80%",
                                    padding: 10,
                                    // marginTop: 20
                                }}>
                                <Text>{'No records for the clinic now , pull down to refresh !'}</Text>
                            </View>
                        </View>
                    }
                />
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight || 0,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: 10
        // flexDirection: "row",
   },
    insideList: {
      flex: 1,

    },
    groups: {
        flex:1,
        // flexDirection: "column",
        backgroundColor: '#c7bbd7',
        margin: 10,
        padding: 10,
        // height: 100,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#6f34a9',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },
    topBtnView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});


export default HomeScreen