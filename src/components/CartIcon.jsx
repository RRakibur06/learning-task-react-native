// src/components/CartIcon.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
    const navigation = useNavigation();
    const { cart } = useCart();

    // cart is { items: [ { product, quantity, _id }, … ] }
    const items = Array.isArray(cart?.items) ? cart.items : [];
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cart')}
        >
            <Text style={styles.icon}>🛒</Text>
            {totalQty > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalQty}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: { marginRight: 16 },
    icon: { fontSize: 20 },
    badge: {
        position: 'absolute',
        right: -6,
        top: -4,
        backgroundColor: 'red',
        borderRadius: 8,
        minWidth: 16,
        paddingHorizontal: 4,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700'
    }
});