import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

const SIGNUP_KEY = '@user_credentials';
const SESSION_KEY = '@logged_in_user';

export default function SignInScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [storedUser, setStoredUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem(SESSION_KEY)
            .then(sessionJson => {
                if (sessionJson) {
                    navigation.replace('Home');
                } else {
                    return AsyncStorage.getItem(SIGNUP_KEY);
                }
            })
            .then(signupJson => {
                if (signupJson) {
                    setStoredUser(JSON.parse(signupJson));
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2a9d8f" />
            </View>
        );
    }

    const validate = () => {
        const e = {};
        let valid = true;
        if (!username.trim()) { e.username = 'Required'; valid = false; }
        if (password.length < 6) { e.password = 'Min 6 characters'; valid = false; }
        setErrors(e);
        return valid;
    };

    const handleSignIn = async () => {
        if (!validate()) return;

        if (!storedUser) {
            return Alert.alert('No account', 'Please sign up first');
        }

        const match =
            username === storedUser.username &&
            password === storedUser.password;

        if (!match) {
            return Alert.alert('Invalid', 'Username or password is incorrect');
        }

        try {
            const session = JSON.stringify({
                username: storedUser.username,
            });
            await AsyncStorage.setItem(SESSION_KEY, session);
            navigation.replace('Home');
        } catch {
            Alert.alert('Error', 'Could not create session');
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
                            placeholder="Enter your password"
                            error={errors.password}
                        />

                        <PrimaryButton title="Sign In" onPress={handleSignIn} />

                        <View style={styles.footer}>
                            <Text style={styles.text}>
                                Don’t have an account?{' '}
                                <Text
                                    style={styles.link}
                                    onPress={() => navigation.navigate('SignUp')}
                                >
                                    Sign Up
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center' },
    container: { flexGrow: 1, padding: 16 },
    form: { flex: 1, justifyContent: 'center' },
    footer: { marginTop: 24, alignItems: 'center' },
    text: { fontSize: 14, color: '#444' },
    link: { color: '#2a9d8f', fontWeight: '600' }
});