import React from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default function Loader({ visible = false }) {
    return (
        <Modal
            transparent
            animationType="none"
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#2a9d8f" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8
    }
});