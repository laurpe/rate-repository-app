import { SIGN_IN } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        const authResult = await mutate({ variables: { username: username, password: password }  });

        await authStorage.setAccessToken(authResult.data.authorize.accessToken);

        apolloClient.resetStore();

        return authResult;
    };

    return [signIn, result];
};

export default useSignIn;