import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProductDetails({ product }) {
    const { name, price, image, description } = product;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>

            {description && (
                <Text style={styles.description}>{description}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#eee'
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: '#2a9d8f',
        marginBottom: 12
    },
    description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center'
    }
});