import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputInvalid: {
        borderColor: '#d73a4a',
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [style];

    return <NativeTextInput style={[textInputStyle, error && styles.inputInvalid]} {...props} />;
};

export default TextInput;