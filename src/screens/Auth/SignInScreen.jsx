import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { signIn } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        async function checkToken() {
            try {
                const token = await AsyncStorage.getItem('@access_token');
                if (token) {
                    navigation.replace('Home');
                } else {
                    setLoading(false);
                }
            } catch {
                setLoading(false);
            }
        }
        checkToken();
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

        if (!email.trim()) { e.email = 'Email is required'; valid = false; }
        if (!password.trim()) { e.password = 'Password is required'; valid = false; }
        setErrors(e);
        return valid;
    };

    const handleSignIn = async () => {
        if (!validate()) return;

        try {
            await signIn({ email, password });
            navigation.replace('Home');
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            Alert.alert('Login Failed', msg);
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
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            error={errors.email}
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