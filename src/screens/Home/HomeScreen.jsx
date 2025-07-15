import React from 'react';
import { SafeAreaView, View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { products } from '../../utils/data';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@logged_in_user';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await AsyncStorage.removeItem(SESSION_KEY);
        navigation.replace('SignIn');
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                    title="Purchase"
                    accessibilityLabel="Buy this item"
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.heading}>ShopApp</Text>
                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* <TouchableOpacity
                style={styles.customButton}
                onPress={() => navigation.navigate('Practice')}
            >
                <Text style={styles.buttonText}>Redirect to practice screen One</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.customButton}
                onPress={() => navigation.navigate('PracticeTwo')}
            >
                <Text style={styles.buttonText}>Redirect to practice screen Two</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.customButton}
                onPress={() => navigation.navigate('PracticeThree')}
            >
                <Text style={styles.buttonText}>Redirect to practice screen Three</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16
    },

    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        margin: 'auto'
    },

    listContainer: {
        paddingBottom: 16
    },

    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4
    },

    productImage: {
        width: '100%',
        height: 120,
        backgroundColor: 'lightgrey',
        // borderWidth: 1,
        // borderColor: 'red',
    },

    infoContainer: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    name: {
        fontSize: 14,
        marginBottom: 6
    },

    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2a9d8f'
    },
    customButton: {
        marginVertical: 10,
        backgroundColor: '#2a9d8f',
        width: '80%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        margin: 'auto',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    logOutButton: {
        backgroundColor: '#e76f51',
        padding: 10,
        borderRadius: 5,
    },
});