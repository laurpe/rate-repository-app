import { SIGN_UP } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);

    const signUp = async ({ username, password }) => {
        const user = await mutate ({ variables: { username: username, password: password } });

        return user;
    };

    return [signUp, result];
};


export default useSignUp;