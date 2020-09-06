import service from "./config";
import AsyncStorage from "@react-native-community/async-storage";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// email, password, clinic, phone, address

const getAllRecords =  async (callback, errcallback) => {



    const getClinic = await AsyncStorage.getItem('clinic')

    // const url = '/consultationRecord/'

    const url = '/consultationRecord/' + getClinic


    service.get(url)
        .then(callback)
        .catch(errcallback);

}

export default getAllRecords

