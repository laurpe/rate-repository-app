import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center'
    }
});

const RepositoryView = () => {
    const id = useParams().id;

    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: { id }
    });

    const onPress = () => {
        Linking.openURL(data.repository.url);
    };

    if (loading) {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RepositoryItem item={data.repository} />
            <Pressable onPress={onPress} >
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Open in GitHub
                </Text>
            </Pressable>
        </View>
    );
};


export default RepositoryView;