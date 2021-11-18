import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const useMyReviews = ({ first }) => {
    const { data, loading, fetchMore } = useQuery(GET_AUTHORIZED_USER, {
        variables: { includeReviews: true, first },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                first
            },
        });
    };

    return {
        myReviews: data?.authorizedUser.reviews,
        fetchMore: handleFetchMore
    };

};

export default useMyReviews;