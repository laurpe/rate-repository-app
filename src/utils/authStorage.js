import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:token`
        );

        return accessToken;
    }

    async setAccessToken(accessToken) {
        const newToken = accessToken;

        await AsyncStorage.setItem(
            `${this.namespace}:token`, newToken
        );
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
    }
}

export default AuthStorage;