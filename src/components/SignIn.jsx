import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15
    },
    inputContainer: {
        marginBottom: 15
    },
    inputField: {
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a9a9a9',
        overflow: 'hidden'
    },
    button: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 15,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center'
    }
});

const initialValues = {
    username: '',
    password: ''
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
});

export const SignInForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="username" placeholder="Username" testID="usernameField" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="password" placeholder="Password" secureTextEntry={true} testID="passwordField" />
            </View>
            <Pressable onPress={onSubmit} testID="submitButton">
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signIn({ username, password });
            history.push('/');

        } catch (error) {
            console.log(error);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;