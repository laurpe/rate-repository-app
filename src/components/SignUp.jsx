import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useHistory } from 'react-router-native';
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
        paddingTop: 15,
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
    password: '',
    passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(1, 'Username must have at least 1 character').max(30, 'Username cannot have more than 35 characters'),
    password: yup.string().required('Password is required').min(5, 'Password must have at least 5 characters').max(50, 'Password cannot have more than 50 characters'),
    passwordConfirmation: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignUpForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="username" placeholder="Username" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="password" placeholder="Password" secureTextEntry={true} />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
            </View>
            <Pressable onPress={onSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Sign up
                </Text>
            </Pressable>
        </View>
    );
};

const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password });
            await signIn({ username, password });
            history.push('/');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SignUpContainer onSubmit={onSubmit} />
    );
};


export default SignUp;