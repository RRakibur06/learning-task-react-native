import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native';
import { useCart } from '../context/CartContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import {
    getProductReviews,
    addReview
} from '../api/reviewsApi';

export default function ProductDetails({ product }) {
    const { name, price, image, description, _id } = product;
    const { addToCart } = useCart();

    const [adding, setAdding] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getProductReviews(_id);
                setReviews(data);
            } catch {
                Alert.alert('Error', 'Could not load reviews.');
            } finally {
                setLoadingReviews(false);
            }
        })();
    }, [_id]);

    const handleAddToCart = async () => {
        setAdding(true);
        try { await addToCart(_id, 1); }
        catch (err) {
            Alert.alert('Couldn’t add to cart', err.message);
        } finally { setAdding(false); }
    };

    const openReviewModal = () => {
        setComment('');
        setModalVisible(true);
    };

    const submitReview = async () => {
        if (!comment.trim()) {
            return Alert.alert('Validation', 'Please enter your review.');
        }
        setSubmitting(true);
        try {
            await addReview({ productId: _id, comment });
            const updated = await getProductReviews(_id);
            setReviews(updated);
            setModalVisible(false);
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            Alert.alert('Error', msg);
        } finally {
            setSubmitting(false);
        }
    };

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            <Text style={styles.reviewUser}>{item.user.name}</Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
            <Text style={styles.reviewDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </View>
    );

    const ListHeader = () => (
        <View>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {description && (
                <Text style={styles.description}>{description}</Text>
            )}

            {adding
                ? <ActivityIndicator size="large" color="#2a9d8f" />
                : <TouchableOpacity onPress={handleAddToCart} style={styles.cartBtn}>
                    <Text style={styles.cartBtnText}>Add to Cart</Text>
                </TouchableOpacity>
            }

            <View style={styles.reviewHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <TouchableOpacity onPress={openReviewModal}>
                    <Text style={styles.addReview}>Add Review</Text>
                </TouchableOpacity>
            </View>

            {loadingReviews && (
                <ActivityIndicator size="small" color="#2a9d8f" />
            )}

            {!loadingReviews && reviews.length === 0 && (
                <Text style={styles.noReviews}>No reviews yet.</Text>
            )}
        </View>
    );

    if (loadingReviews && reviews.length === 0) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#2a9d8f" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                keyExtractor={r => r._id}
                renderItem={renderReview}
                ListHeaderComponent={ListHeader}
                contentContainerStyle={styles.list}
            />

            {/* Review Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Write a Review</Text>

                        <InputField
                            label="Comment"
                            value={comment}
                            onChangeText={setComment}
                            placeholder="Type your review"
                        />

                        {submitting
                            ? <ActivityIndicator size="large" color="#2a9d8f" />
                            : <PrimaryButton
                                title="Submit"
                                onPress={submitReview}
                            />
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
    container: { flex: 1, backgroundColor: '#fff' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    list: { padding: 16 },

    image: { width: '100%', height: 250, borderRadius: 8, marginBottom: 16 },
    name: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    price: { fontSize: 20, color: '#2a9d8f', marginBottom: 12 },
    description: { fontSize: 16, color: '#555', marginBottom: 16 },

    cartBtn: { backgroundColor: '#2a9d8f', padding: 12, borderRadius: 4, marginBottom: 16 },
    cartBtnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    sectionTitle: { fontSize: 18, fontWeight: '600' },
    addReview: { color: '#2a9d8f', fontSize: 16 },

    noReviews: { textAlign: 'center', color: '#666', marginVertical: 8 },

    reviewCard: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
    reviewUser: { fontWeight: '600', marginBottom: 4 },
    reviewComment: { fontSize: 14, color: '#333' },
    reviewDate: { fontSize: 12, color: '#999', marginTop: 4 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', padding: 20, backgroundColor: '#fff', borderRadius: 8 },
    modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    cancelLink: { marginTop: 12, alignSelf: 'center' },
    cancelText: { color: '#2a9d8f' }
});