import React from 'react';
import { VirtualizedList, StyleSheet, Text, View, SafeAreaView, } from 'react-native';

const largeData = Array.from({ length: 1000 }, (_, i) => `Item #${i + 1}`);

export default function PracticeThree() {
    const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={largeData}
                initialNumToRender={10}
                getItem={getItem}
                getItemCount={getItemCount}
                keyExtractor={(item) => item}
                renderItem={renderItem}
                windowSize={5}
                onEndReachedThreshold={0.5}
                onEndReached={() => console.log('Reached end!')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    item: {
        padding: 16,
        marginVertical: 4,
        marginHorizontal: 16,
        backgroundColor: '#e9c46a',
        borderRadius: 6,
    },
    itemText: { fontSize: 16, color: '#000' },
});