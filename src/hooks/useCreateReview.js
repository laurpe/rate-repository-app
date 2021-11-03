import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {
        const reviewResult = await mutate({ variables: { repositoryName: repositoryName, ownerName: ownerName, rating: parseInt(rating), text: text } });

        return reviewResult;
    };

    return [createReview, result];
};

export default useCreateReview;