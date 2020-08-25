import {AsyncStorage} from "react-native";

export default class DataAccess {
    static save = async (key: string, data: any) => {
        try {
            await AsyncStorage.setItem(key, data);
        } catch (e) {
            console.log(`fail to persist data of key : ${key}`)
        }
    };

    static delete = async (key: string) => {
        try{
            await AsyncStorage.removeItem(key);
        }catch (e) {
            console.log(`fail to remove data of key : ${key} `)
        }
    };

    static get = async(key: string) => {
        try{
            return await AsyncStorage.getItem(key);
        }catch (e) {
            console.log(`fail to get data of key : ${key}`);
            return null;
        }
    }
}