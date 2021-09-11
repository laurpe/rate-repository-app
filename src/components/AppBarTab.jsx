import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 30
    }
});

const AppBarTab = ({ title, link }) => {
    return (
        <Pressable style={styles.container}>
            <Link to={link}>
                <Text fontSize="subheading" fontWeight="bold" color="heading">
                    {title}
                </Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;