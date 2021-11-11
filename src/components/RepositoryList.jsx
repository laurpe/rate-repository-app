import React from 'react';
import { FlatList, Pressable, Text, StyleSheet, View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { Menu, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import theme from '../theme';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
    filterContainer: {
        padding: 15
    },
    sortContainer: {
        color: theme.colors.textPrimary,
        padding: 10
    }
});

const FilterBar = ({ searchKeyword, setSearchKeyword }) => {

    const onChangeFilter = (value) => {
        console.log('value: ', value);
        setSearchKeyword(value);
        console.log('filter: ', searchKeyword);
    };

    return (
        <View style={styles.filterContainer} >
            <Searchbar
                placeholder="Filter repositories"
                onChangeText={onChangeFilter}
                value={searchKeyword}
            />
        </View>
    );
};

//todo: katso vielä teetkö tyylille jotain

const SortingMenu = ({ setOrderBy, setOrderDirection }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <Pressable onPress={openMenu}>
                    <Text style={styles.filterContainer}>Sort repositories</Text>
                </Pressable>
            }
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
    );
};

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection, searchKeyword, setSearchKeyword }) => {

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
            ListHeaderComponent={
                <>
                    <FilterBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
                    <SortingMenu setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} />
                </>
            }
        />
    );
};

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT');
    const [orderDirection, setOrderDirection] = useState('DESC');

    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

    const repositories = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

    return (
        <RepositoryListContainer
            repositories={repositories}
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
        />
    );

};

export default RepositoryList;