import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry = false, error }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.errorBorder]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#888"
                secureTextEntry={secureTextEntry}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginVertical: 8 },
    label: { fontSize: 14, marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
        height: 44
    },
    errorBorder: { borderColor: 'red' },
    errorText: { color: 'red', marginTop: 4, fontSize: 12 }
});