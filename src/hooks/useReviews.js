import { GET_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const useReviews = ({ id, first }) => {
    const { data, loading, fetchMore } = useQuery(GET_REVIEWS, {
        variables: { id, first },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                first
            },
        });
    };

    return {
        reviews: data?.repository.reviews,
        fetchMore: handleFetchMore
    };
};

export default useReviews;