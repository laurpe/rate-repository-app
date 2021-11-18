import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns';
import { useLocation } from 'react-router-native';


const styles = StyleSheet.create({
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

const ReviewItem = ({ review }) => {
    const { pathname } = useLocation();

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.rating}>
                <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfoContainer}>
                <View style={styles.titleContainer}>
                    {pathname === '/myreviews' &&
                    <Text style={styles.titleText}>{review.repository.fullName}</Text>
                    }
                    {pathname !== '/myreviews' &&
                    <Text style={styles.titleText}>{review.user.username}</Text>
                    }

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


export default ReviewItem;