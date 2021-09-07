import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: theme.colors.appBarBackground
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <Pressable>
                <AppBarTab title="Repositories" />
            </Pressable>
        </View>
    );
};

export default AppBar;