import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled }) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 12
    },
    disabled: { backgroundColor: '#aaa' },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});