import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first }) => {
    const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword, first },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy,
                orderDirection,
                searchKeyword,
                first
            },
        });
    };

    const [repositories, setRepositories] = useState();

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);

    return {
        repositories,
        fetchMore: handleFetchMore
    };
};

export default useRepositories;