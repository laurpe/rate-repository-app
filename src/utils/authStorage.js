import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:auth`
        );

        return accessToken ? JSON.parse(accessToken) : '';
    }

    async setAccessToken(accessToken) {
        const newToken = accessToken;

        await AsyncStorage.setItem(
            `${this.namespace}:auth`,
            JSON.stringify(newToken)
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:auth`);
    }
}

export default AuthStorage;