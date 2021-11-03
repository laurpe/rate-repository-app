import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';


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
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name is required'),
    ownerName: yup.string().required('Repository owner name is required'),
    rating: yup.number().integer().required('Rating is required').min(0, 'Rating must be at least 0').max(100, 'Rating cannot be over 100'),
    text: yup.string().optional()
});

const CreateReviewForm = ({ onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="repositoryName" placeholder="Repository name" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="ownerName" placeholder="Repository owner name" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="rating" placeholder="Rating 0-100" />
            </View>
            <View style={styles.inputContainer}>
                <FormikTextInput style={styles.inputField} name="text" placeholder="Review" multiline />
            </View>
            <Pressable onPress={onSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold" color="heading" >
                    Submit review
                </Text>
            </Pressable>
        </View>
    );
};

const CreateReviewContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;

        try {
            const result = await createReview({ repositoryName, ownerName, rating, text });
            console.log(result.data);
            history.push(`/repositories/${result.data.createReview.repositoryId}`);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CreateReviewContainer onSubmit={onSubmit} />
    );
};


export default CreateReview;