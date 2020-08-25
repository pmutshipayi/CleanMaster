import { action } from 'mobx';
import { decorate, observable } from 'mobx';
import DataAccess from '../services/DataAccess';
class ServerStore {
    IP_ADDRESS_KEY = "SERVER_IP";
    IPAddress = "";

    async setIPaddress(ip: string) {
        this.IPAddress = ip;

        // Save ip address on the local storage

        await DataAccess.save(this.IP_ADDRESS_KEY, ip);
    }

    /**
     * load the ip address from the local storage
     */
    async loadIpAddress() {
        const ip = await DataAccess.get(this.IP_ADDRESS_KEY);
        if (ip)
            this.IPAddress = ip;
        else
            this.IPAddress = "http://192.168.43.56:5000";
    }
}
decorate(ServerStore, {
    IPAddress: observable,
    loadIpAddress: action
})
const serverStore = new ServerStore();
export default serverStore;