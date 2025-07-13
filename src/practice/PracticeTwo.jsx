
import { Text, StyleSheet, View, SectionList, SafeAreaView, } from 'react-native';
import { sectionsData } from '../data';


export default function PracticeTwo() {

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={sectionsData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                stickySectionHeadersEnabled
            />
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    itemText: { fontSize: 16 },

});