
import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import useMyReviews from '../hooks/useMyReviews';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const MyReviews = () => {
    const { myReviews, fetchMore, refetch } = useMyReviews({
        first: 4
    });

    const reviewNodes = myReviews
        ? myReviews.edges.map(edge => edge.node)
        : [];

    const onEndReach = () => {
        fetchMore();
    };

    const [mutate] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        await mutate({ variables: { id } });
        refetch();
    };

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} deleteReview={deleteReview} />}
            keyExtractor={({ id }) => id}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};


export default MyReviews;