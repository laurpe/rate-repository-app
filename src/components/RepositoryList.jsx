import React from 'react';
import { FlatList, Pressable, Button } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { Menu } from 'react-native-paper';
import { useState } from 'react';


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
    const [visible, setVisible] = useState(false);
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const repositories = useRepositories(orderBy, orderDirection);

    return (
        <>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu} title="Sort repositories" />}
            >
                <Menu.Item
                    onPress={() => {
                        setOrderBy('CREATED_AT');
                        setOrderDirection('DESC');
                        closeMenu();
                    }}
                    title="Latest repositories"
                />
                <Menu.Item
                    onPress={() => {
                        setOrderBy('RATING_AVERAGE');
                        setOrderDirection('DESC');
                        closeMenu();
                    }}
                    title="Highest rated repositories"
                />
                <Menu.Item
                    onPress={() => {
                        setOrderBy('RATING_AVERAGE');
                        setOrderDirection('ASC');
                        closeMenu();
                    }}
                    title="Lowest rated repositories"
                />
            </Menu>
            <RepositoryListContainer repositories={repositories} />
        </>
    );

};

export default RepositoryList;