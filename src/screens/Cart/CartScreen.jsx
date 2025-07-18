import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import { useCart } from '../../context/CartContext';
import { placeOrder } from '../../api/ordersApi';

export default function CartScreen({ navigation }) {
    const {
        cart,
        loading,
        mutating,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [orderLoading, setOrderLoading] = useState(false);

    if (loading || mutating) {
        return <Loader visible={true} />;
    }

    const items = cart.items;
    if (items.length === 0) {
        return (
            <View style={styles.container}>
                <Header />
                <Text style={styles.empty}>Your cart is empty</Text>
                <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <Button
                        title="View Order History"
                        onPress={() => navigation.navigate('OrderHistory')}
                    />
                </View>
            </View>
        );
    }

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            Alert.alert('Validation', 'Please enter a shipping address.');
            return;
        }

        setOrderLoading(true);
        try {
            await placeOrder({ shippingAddress: address, paymentMethod });
            clearCart();
            Alert.alert('Success', 'Order placed!', [
                {
                    text: 'OK',
                    onPress: () => {
                        setModalVisible(false);
                        navigation.navigate('Home');
                    }
                }
            ]);
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            Alert.alert('Order Failed', msg);
        } finally {
            setOrderLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        const { product, quantity } = item;
        return (
            <View style={styles.row}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{product.name}</Text>
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
                        <TouchableOpacity onPress={() => removeFromCart(product._id)}>
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
                keyExtractor={(i) => i._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <View style={styles.summary}>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <Button
                    title="Proceed to Checkout"
                    onPress={() => setModalVisible(true)}
                />
                <View style={{ marginTop: 16 }}>
                    <Button
                        title="View Order History"
                        onPress={() => navigation.navigate('OrderHistory')}
                    />
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Complete Your Order</Text>

                        <InputField
                            label="Shipping Address"
                            value={address}
                            onChangeText={setAddress}
                            placeholder="123 Main St, City, Country"
                        />

                        <Text style={styles.label}>Payment Method</Text>
                        <View style={styles.paymentOptions}>
                            {['card', 'paypal'].map((method) => (
                                <TouchableOpacity
                                    key={method}
                                    style={[
                                        styles.payButton,
                                        paymentMethod === method && styles.payButtonActive
                                    ]}
                                    onPress={() => setPaymentMethod(method)}
                                >
                                    <Text
                                        style={[
                                            styles.payText,
                                            paymentMethod === method && styles.payTextActive
                                        ]}
                                    >
                                        {method.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {orderLoading
                            ? <ActivityIndicator size="large" color="#2a9d8f" />
                            : <PrimaryButton title="Place Order" onPress={handlePlaceOrder} />
                        }

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.cancelLink}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
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
    total: { fontSize: 18, fontWeight: '700', marginBottom: 8 },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    label: { fontSize: 14, marginBottom: 8 },
    paymentOptions: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-around'
    },
    payButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4
    },
    payButtonActive: {
        backgroundColor: '#2a9d8f',
        borderColor: '#2a9d8f'
    },
    payText: { color: '#444' },
    payTextActive: { color: '#fff' },
    cancelLink: { marginTop: 8, alignSelf: 'center' },
    cancelText: { color: '#2a9d8f' },
    historyButton: { marginTop: 16, alignItems: 'center' },
    historyButtonTwo: { marginTop: 16 },
});