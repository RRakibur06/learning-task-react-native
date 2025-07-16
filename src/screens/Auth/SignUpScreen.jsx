import React, { useState } from 'react';
import {
    StyleSheet,
    Alert,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { signUp } from '../../api/api';


export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    const validate = () => {
        const e = {};
        let valid = true;

        if (!name.trim()) { e.name = 'Name is required'; valid = false; }
        if (!email.trim()) { e.email = 'Email is required'; valid = false; }
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            e.email = 'Email is invalid'; valid = false;
        }
        if (password.length < 6) { e.password = 'Min 6 characters'; valid = false; }

        setErrors(e);
        return valid;
    };

    const handleSignUp = async () => {
        if (!validate()) return;

        try {
            await signUp({ name, email, password });
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
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                            error={errors.name}
                        />

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
                            placeholder="Create a password"
                            error={errors.password}
                        />

                        <PrimaryButton title="Sign Up" onPress={handleSignUp} />
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