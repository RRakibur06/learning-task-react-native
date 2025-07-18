import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { getOrderHistory } from '../../api/ordersApi';

export default function OrderHistoryScreen() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHistory() {
            try {
                const data = await getOrderHistory();
                setOrders(data);
            } catch (err) {
                console.error('Failed to load orders', err);
            } finally {
                setLoading(false);
            }
        }
        loadHistory();
    }, []);

    if (loading) {
        return <Loader visible={true} />;
    }

    if (orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Header />
                <Text style={styles.emptyText}>No past orders found.</Text>
            </View>
        );
    }

    const renderOrder = ({ item: order }) => (
        <View style={styles.card}>
            <Text style={styles.orderId}>Order #{order._id}</Text>
            <Text style={styles.date}>
                {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.status}>
                Status: <Text style={styles.bold}>{order.status}</Text>
            </Text>
            <Text style={styles.label}>Shipping:</Text>
            <Text style={styles.value}>{order.shippingAddress}</Text>
            <Text style={styles.label}>Payment:</Text>
            <Text style={styles.value}>{order.paymentMethod}</Text>

            <Text style={[styles.label, { marginTop: 10 }]}>Items:</Text>
            {order.items.map(({ product, quantity, _id }) => (
                <View key={_id} style={styles.itemRow}>
                    <Image source={{ uri: product.image }} style={styles.thumbnail} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{product.name}</Text>
                        <Text style={styles.itemQty}>Qty: {quantity}</Text>
                        <Text style={styles.itemPrice}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>
                </View>
            ))}

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>
                    ${order.totalAmount.toFixed(2)}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />

            <FlatList
                data={orders}
                keyExtractor={(o) => o._id}
                renderItem={renderOrder}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#666' },
    list: { padding: 12 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        elevation: 2
    },
    orderId: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    date: { fontSize: 12, color: '#888', marginBottom: 8 },
    status: { fontSize: 14, marginBottom: 6 },
    bold: { fontWeight: '700' },
    label: { fontSize: 13, color: '#555' },
    value: { fontSize: 14, marginBottom: 6 },
    itemRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center'
    },
    thumbnail: { width: 50, height: 50, borderRadius: 4, marginRight: 8 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 14, fontWeight: '500' },
    itemQty: { fontSize: 12, color: '#555' },
    itemPrice: { fontSize: 14, color: '#2a9d8f', marginTop: 2 },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 8
    },
    totalLabel: { fontSize: 14, fontWeight: '600' },
    totalValue: { fontSize: 14, fontWeight: '700' }
});