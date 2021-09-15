import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

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

const SignInForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="username" placeholder="Username" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="password" placeholder="Password" secureTextEntry={true} />
            </View>
            <Pressable onPress={onSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

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

export default SignIn;