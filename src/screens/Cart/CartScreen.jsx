import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    Alert
} from 'react-native';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { useCart } from '../../context/CartContext';


export default function CartScreen({ navigation }) {
    const { cart, loading, mutating, updateQuantity, removeFromCart } = useCart();

    if (loading || mutating) {
        return <Loader visible={true} />;
    }

    const items = cart.items;


    if (items.length === 0) {
        return (
            <View style={styles.container}>
                <Header />
                <Text style={styles.empty}>Your cart is empty</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        const { product, quantity } = item;

        return (
            <View style={styles.row}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.info}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.desc}>{product.description}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={() =>
                                updateQuantity(product._id, Math.max(quantity - 1, 1))
                            }
                        >
                            <Text style={styles.btn}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.qty}>{quantity}</Text>

                        <TouchableOpacity
                            onPress={() => updateQuantity(product._id, quantity + 1)}
                        >
                            <Text style={styles.btn}>＋</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => removeFromCart(product._id)}
                        >
                            <Text style={styles.remove}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const total = items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    );

    return (
        <View style={styles.container}>
            <Header />

            <FlatList
                data={items}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <View style={styles.summary}>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <Button
                    title="Proceed to Checkout"
                    onPress={() => {
                        Alert.alert('Success', 'Checkout complete!');
                        navigation.navigate('Home');
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    loader: { flex: 1, justifyContent: 'center' },
    empty: { textAlign: 'center', marginTop: 50, color: '#666' },
    list: { padding: 8 },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 1
    },
    image: { width: 100, height: 100 },
    info: { flex: 1, padding: 8 },
    name: { fontSize: 16, fontWeight: '600' },
    desc: { fontSize: 14, color: '#555', marginVertical: 4 },
    price: { fontSize: 16, color: '#2a9d8f', marginBottom: 8 },
    controls: { flexDirection: 'row', alignItems: 'center' },
    btn: { fontSize: 20, width: 32, textAlign: 'center' },
    qty: { marginHorizontal: 8 },
    remove: { marginLeft: 12, color: '#e76f51' },
    summary: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    total: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});