import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import api from '../../api/api';
import Header from '../../components/Header';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                if (res.data.success) {
                    setProducts(res.data.data);
                } else {
                    console.warn('Failed to load products');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
            }
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#2a9d8f" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />

            {products.length === 0 ? (
                <Text style={styles.empty}>No products found.</Text>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    loader: { flex: 1, justifyContent: 'center' },
    empty: { textAlign: 'center', marginTop: 20, color: '#666' },
    list: { padding: 8 },
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        alignItems: 'center',
        padding: 12
    },
    image: { width: 100, height: 100, marginBottom: 8 },
    name: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
    price: { fontSize: 16, color: '#2a9d8f' }
});