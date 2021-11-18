
import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import useMyReviews from '../hooks/useMyReviews';


const MyReviews = () => {
    const { myReviews, fetchMore } = useMyReviews({
        first: 4
    });

    const reviewNodes = myReviews
        ? myReviews.edges.map(edge => edge.node)
        : [];

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};


export default MyReviews;