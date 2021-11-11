import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network'
    });

    const [repositories, setRepositories] = useState();

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);

    return repositories;
};

export default useRepositories;