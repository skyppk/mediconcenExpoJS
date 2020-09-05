import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    SafeAreaView,
    StatusBar
} from "react-native";

import Service from "../../Services";
import ListItem from "../../Component/ListItem";

const {width: WIDTH} = Dimensions.get('window')


class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            consultationRecords: [],
            isRefreshing: false
        }

        Service.getAllRecords(response => {
            this.setState({consultationRecords: response.data.data})
        })

    }


    getRecordsCallback = () =>  Service.getAllRecords(response => {
            this.setState({consultationRecords: response.data.data})
        }
    )

    seeDetails = (item) => {
        this.props.navigation.navigate('Details',{details: item})
    }



    render() {
        return(
            <SafeAreaView style={styles.container}>

                

                <FlatList
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
                    // keyExtractor={item => item.id}
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
                                    backgroundColor: "white",
                                    width: "80%",
                                    padding: 10,
                                    // marginTop: 20
                                }}>
                                <Text>{this.state.isRefreshing ? '資料更新中，請稍候' : this.state.networkFail ? '網絡發生錯誤，請下拉更新' : '暫時沒有資料，下拉更新'}</Text>
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
        // flexDirection: "row",
   }
});


export default HomeScreen