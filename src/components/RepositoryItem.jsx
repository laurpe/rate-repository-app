import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { roundValue } from '../utils/roundValue';


const styles = StyleSheet.create({
    repositoryItemContainer: {
        display: 'flex',
        marginBottom: 10,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white'
    },
    statisticsContainer: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    statisticsItem: {
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flexDirection: 'row',
        display: 'flex',
        padding: 5
    },
    descriptionContainer: {
        flexShrink: 1,
        marginLeft: 10,
    },
    descriptionItem: {
        padding: 5,
        flexWrap: 'wrap'
    },
    languageTag: {
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: theme.colors.primary
    }
});

const Statistics = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {

    return (
        <View style={styles.statisticsContainer}>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold" testID="stargazersCount">{roundValue(stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold" testID="forksCount">{roundValue(forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold" testID="reviewCount">{roundValue(reviewCount)}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold" testID="ratingAverage">{roundValue(ratingAverage)}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    );
};

const Avatar = ({ imageUrl }) => {

    return (
        <View style={styles.avatar}>
            <Image
                source={{ uri: `${imageUrl}` }}
                style={{ width: 60, height: 60, borderRadius: 8 }}
            />
        </View>
    );
};

const LanguageTag = ({ language }) => {

    return (
        <View style={styles.languageTag}>
            <Text style={{ color: 'white' }} testID="language">{language}</Text>
        </View>
    );
};

const Name = ({ name }) => {

    return (
        <Text style={styles.descriptionItem} fontSize="subheading" fontWeight="bold" testID="name">{name}</Text>
    );
};

const Description = ({ description }) => {

    return (
        <Text style={styles.descriptionItem} testID="description">{description}</Text>
    );
};

const RepositoryItem = ({ item }) => {

    return (
        <View style={styles.repositoryItemContainer}>
            <View style={styles.infoContainer}>
                <Avatar imageUrl={item.ownerAvatarUrl} />
                <View style={styles.descriptionContainer}>
                    <Name name={item.fullName} />
                    <Description description={item.description} />
                    <LanguageTag language={item.language} />
                </View>
            </View>
            <Statistics
                stargazersCount={item.stargazersCount}
                forksCount={item.forksCount}
                reviewCount={item.reviewCount}
                ratingAverage={item.ratingAverage}
            />
        </View>
    );
};


export default RepositoryItem;