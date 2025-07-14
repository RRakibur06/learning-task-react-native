import React, { useState } from 'react';
import { StyleSheet, Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/InputField';
import DropDown from '../../components/DropDown';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    const validate = () => {
        const e = {};
        let valid = true;

        if (!username.trim()) { e.username = 'Username is required'; valid = false; }
        if (password.length < 6) { e.password = 'Min 6 characters'; valid = false; }
        if (!role) { e.role = 'Please select a role'; valid = false; }

        setErrors(e);
        return valid;
    };

    const handleSignUp = async () => {
        if (!validate()) return;

        try {
            const user = JSON.stringify({ username, password, role });
            await AsyncStorage.setItem('@user_credentials', user);
            navigation.replace('SignIn');
        } catch {
            Alert.alert('Error', 'Failed to save user');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.form}>
                        <InputField
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter your username"
                            error={errors.username}
                        />

                        <InputField
                            label="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Create a password"
                            error={errors.password}
                        />

                        <DropDown
                            label="Role"
                            items={[
                                { label: 'Seller', value: 'Seller' },
                                { label: 'Buyer', value: 'Buyer' }
                            ]}
                            value={role}
                            onValueChange={setRole}
                            error={errors.role}
                        />

                        <PrimaryButton
                            title="Sign Up"
                            onPress={handleSignUp}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    container: {
        flexGrow: 1,
        padding: 16
    },

    form: {
        flex: 1,
        justifyContent: 'center'
    }
});