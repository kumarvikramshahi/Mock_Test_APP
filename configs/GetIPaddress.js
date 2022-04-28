import { NetworkInfo } from 'react-native-network-info';

export const GetLocalIP = () => {
    NetworkInfo.getIPAddress()
        .then(ipAddress => {
            return ipAddress
        })
        .catch(err => err);
}

export const GetIPv4 =
    NetworkInfo.getIPV4Address()
        .then(ipv4Address => ipv4Address)
        .catch(err => err);


