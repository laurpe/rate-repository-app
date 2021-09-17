import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
    const { data } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });

    const [repositories, setRepositories] = useState();

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);

    return repositories;
};

export default useRepositories;