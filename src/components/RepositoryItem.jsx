import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';


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
        margin: 5,
        padding: 5,
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
        flex: 1,
        flexShrink: 1,
        marginLeft: 10,
    },
    descriptionItem: {
        padding: 5,
        flex: 1,
        flexWrap: 'wrap'
    },
    languageTag: {
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: theme.colors.primary
    }
});

const Statistics = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
    const roundValue = (value) => {
        if (value >= 1000) {
            const roundedValue = Math.round((value / 1000) * 10) / 10;
            return `${roundedValue}k`;
        }
        return value;
    };

    return (
        <View style={styles.statisticsContainer}>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold">{roundValue(stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold">{roundValue(forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold">{roundValue(reviewCount)}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.statisticsItem}>
                <Text fontWeight="bold">{roundValue(ratingAverage)}</Text>
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
            <Text style={{ color: 'white' }}>{language}</Text>
        </View>
    );
};

const Name = ({ name }) => {

    return (
        <Text style={styles.descriptionItem} fontSize="subheading" fontWeight="bold">{name}</Text>
    );
};

const Description = ({ description }) => {

    return (
        <Text style={styles.descriptionItem}>{description}</Text>
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