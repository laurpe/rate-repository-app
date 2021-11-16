import React from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';
import { format, parseISO } from 'date-fns';
import useReviews from '../hooks/useReviews';


const styles = StyleSheet.create({
    repositoryContainer: {
        backgroundColor: 'white',
        marginBottom: 10
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
    },
    reviewContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 20,
        backgroundColor: 'white'
    },
    reviewInfoContainer: {
        flexShrink: 1,
        marginLeft: 10
    },
    titleContainer: {
        paddingBottom: 5
    },
    dateContainer: {
        paddingBottom: 5
    },
    textContainer: {
    },
    rating: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading
    },
    titleText: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.bold
    },
    dateText: {
        color: theme.colors.textSecondary,
    },
    reviewText: {
        color: theme.colors.textPrimary
    },
});

const RepositoryInfo = () => {
    const { id } = useParams();

    const { data, loading } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
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
        <View style={styles.repositoryContainer}>
            <RepositoryItem item={data.repository} />
            <Pressable onPress={onPress} >
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Open in GitHub
                </Text>
            </Pressable>
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.rating}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfoContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{review.user.username}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.reviewText}>{review.text}</Text>
                </View>
            </View>
        </View>
    );
};

const SingleRepository = () => {
    const { id } = useParams();

    const { reviews, fetchMore } = useReviews({
        id: id,
        first: 4
    });

    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={<RepositoryInfo />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
        />
    );


};


export default SingleRepository;