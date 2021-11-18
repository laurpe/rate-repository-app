import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';
import { Link } from 'react-router-native';
import { useHistory } from 'react-router-native';


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: theme.colors.appBarBackground,
        display: 'flex',
        flexDirection: 'row'
    },
    tabContainer: {
        paddingTop: 20,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 30
    }
});

const AppBarTab = (props) => {
    return (
        <Pressable style={styles.tabContainer} onPress={props.onPress}>
            <Text fontSize="subheading" fontWeight="bold" color="heading">
                {props.children}
            </Text>
        </Pressable>
    );
};

const AppBar = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const history = useHistory();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        history.push('/');
    };

    const result = useQuery(GET_AUTHORIZED_USER, {
        variables: { includeReviews: false },
        fetchPolicy: 'cache-and-network',
    });

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={AppBarTab}>Repositories</Link>
                {!result.data || !result.data.authorizedUser &&
                    <>
                        <Link to="/signin" component={AppBarTab}>Sign in</Link>
                        <Link to="/signup" component={AppBarTab}>Sign up</Link>
                    </>
                }
                {result.data && result.data.authorizedUser &&
                    <>
                        <Link to="/createreview" component={AppBarTab}>Create review</Link>
                        <Link to="/myreviews" component={AppBarTab}>My reviews</Link>
                        <AppBarTab onPress={signOut} >Sign out</AppBarTab>
                    </>
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;