import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns';
import { useLocation, useHistory } from 'react-router-native';


const styles = StyleSheet.create({
    wholeReviewContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    reviewContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20
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
    reviewInfoContainer: {
        flexShrink: 1,
        marginLeft: 10,
    },
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonBlue: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 0.46
    },
    buttonRed: {
        backgroundColor: '#d73a4a',
        color: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flex: 0.46
    },
    titleContainer: {
        paddingBottom: 5
    },
    dateContainer: {
        paddingBottom: 5
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

const ReviewItem = ({ review, deleteReview }) => {
    const { pathname } = useLocation();

    let history = useHistory();

    const deleteAlert = () => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteReview(review.id)
                }
            ]
        );
    };

    return (
        <View style={styles.wholeReviewContainer}>
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
            {pathname === '/myreviews' &&
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.buttonBlue} onPress={() => history.push(`/repositories/${review.repository.id}`)}>
                        <View>
                            <Text fontWeight="bold" color="heading" >View repository</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.buttonRed} onPress={() => deleteAlert()}>
                        <View>
                            <Text fontWeight="bold" color="heading" >Delete review</Text>
                        </View>
                    </Pressable>
                </View>
            }
        </View>

    );
};


export default ReviewItem;