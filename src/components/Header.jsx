import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartIcon from './CartIcon';
import { clearAuthTokens } from '../api/api';

export default function Header() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await clearAuthTokens();
            navigation.replace('SignIn');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Could not log out.');
        }
    };

    return (
        <View style={styles.header}>
            {/* <Image
        source={require('../../assets/logo.png')} // your logo file
        style={styles.logo}
      /> */}
            <Text style={styles.heading}>ShopApp</Text>

            <View style={styles.right}>
                <CartIcon />

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        elevation: 4
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoutBtn: {
        marginLeft: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#e76f51',
        borderRadius: 4
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600'
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        margin: 'auto'
    },
});