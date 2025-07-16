import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductDetails from '../../components/ProductDetails';
import Header from '../../components/Header';

export default function ProductDetailsScreen({ route }) {
    const { product } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <Header />
            <ProductDetails product={product} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        backgroundColor: '#fff'
    }
});