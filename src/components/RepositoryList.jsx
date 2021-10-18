import React from 'react';
import { FlatList, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';


export const RepositoryListContainer = ({ repositories }) => {

    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    let history = useHistory();

    return (
        <FlatList
            data={repositoryNodes}
            renderItem={({ item }) => (
                <Pressable onPress={() => history.push(`/repositories/${item.id}`)}>
                    <RepositoryItem item={item} />
                </Pressable>
            )}
            keyExtractor={item => item.id}
        />
    );
};

const RepositoryList = () => {
    const repositories = useRepositories();

    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;