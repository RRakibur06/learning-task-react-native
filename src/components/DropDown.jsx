import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, Text, Platform } from 'react-native';

export default function DropDown({ label, items, value, onValueChange, error }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>

            <RNPickerSelect
                onValueChange={onValueChange}
                items={items}
                value={value}
                placeholder={{ label: 'Select...', value: null }}
                useNativeAndroidPickerStyle={false}
                style={{
                    inputIOS: styles.input,
                    inputAndroid: styles.input,
                    placeholder: {
                        ...styles.input,
                        color: '#999'
                    }
                }}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8
    },
    label: {
        fontSize: 14,
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
        height: 44,
        justifyContent: 'center',
        color: '#000',
        backgroundColor: '#fff'
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        fontSize: 12
    }
});