import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 10
    }
});

const AppBarTab = ({ title }) => {
    return (
        <View style={styles.container}>
            <Pressable>
                <Text fontSize="subheading" fontWeight="bold" color="heading">
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

export default AppBarTab;