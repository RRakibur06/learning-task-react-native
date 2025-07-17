import React from 'react';
import {
    View,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../../schemas/authSchemas';
import { signUp } from '../../api/api';

import InputField from '../../components/InputField';
import DropDown from '../../components/DropDown';
import PrimaryButton from '../../components/PrimaryButton';
import Loader from '../../components/Loader';

export default function SignUpScreen() {
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: '', email: '', password: '' }
    });

    const onSubmit = async data => {
        try {
            await signUp(data);
            Alert.alert(
                'Success',
                'Account created! Please log in.',
                [{ text: 'OK', onPress: () => navigation.replace('SignIn') }]
            );
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            Alert.alert('Sign Up Failed', msg);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Loader visible={isSubmitting} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <InputField
                                    label="Name"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter your full name"
                                    error={errors.name?.message}
                                />
                            )}
                        />

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
                                    placeholder="Create a password"
                                    error={errors.password?.message}
                                />
                            )}
                        />

                        <PrimaryButton
                            title="Sign Up"
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: { flexGrow: 1, padding: 16 },
    form: { flex: 1, justifyContent: 'center' }
});