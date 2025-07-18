import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../../schemas/authSchemas';
import { signIn } from '../../api/api';

import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = async data => {
        try {
            await signIn(data);
            navigation.replace('Home');
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            Alert.alert('Login Failed', msg);
        }
    };

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

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Loader visible={isSubmitting || loading} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <InputField
                                    label="Email"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your email"
                                    error={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { value, onChange } }) => (
                                <InputField
                                    label="Password"
                                    secureTextEntry
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your password"
                                    error={errors.password?.message}
                                />
                            )}
                        />

                        <PrimaryButton
                            title="Sign In"
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />

                        <Text style={{ textAlign: 'center', marginTop: 24 }}>
                            Don’t have an account?{' '}
                            <Text
                                style={{ color: '#2a9d8f', fontWeight: '600' }}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                Sign Up
                            </Text>
                        </Text>
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