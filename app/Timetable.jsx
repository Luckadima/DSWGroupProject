import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TimeTable() {

    const Tues = () => {
        router.push('/Tuesday');
    };

    const Weds = () => {
        router.push('/Wedensday');
    };

    const Thurs = () => {
        router.push('/Thursday');
    };

    const Fri = () => {
        router.push('/Friday');
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Class Timetable</Text>
                    <Text style={styles.subtitle}>APB Auckland Park Bunting Road Campus</Text>
                </View>

                <View style={styles.tabs}>
                <TouchableOpacity>
                        <Text style={styles.tab}>Mon</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Tues}>
                        <Text style={styles.tab}>Tue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Weds}>
                        <Text style={styles.tab}>Wed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Thurs}>
                        <Text style={styles.tab}>Thu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Fri}>
                        <Text style={styles.tab}>Fri</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.table}>
                    {[
                        { time: '07:00 - 08:45' },
                        { time: '08:45 - 10:30' },
                        { time: '10:30 - 11:15' },
                        { time: '11:20 - 12:05', subject: '(CMN02B1)COMMUNICATION NETWORKS 2B', location: 'APB BLOCK B RED 2', type: 'Class' },
                        { time: '12:10 - 12:55', subject: '(CMN02B1)COMMUNICATION NETWORKS 2B', location: 'APB BLOCK B RED 2', type: 'Class' },
                        { time: '13:00 - 13:45' },
                        { time: '13:50 - 14:35' },
                        { time: '14:40 - 15:25' },
                    ].map((entry, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.time}>{entry.time}</Text>
                            {entry.subject ? (
                                <View style={styles.details}>
                                    <Text style={styles.subject}>{entry.subject}</Text>
                                    <Text style={styles.location}>{entry.location}</Text>
                                    <Text style={styles.type}>{entry.type}</Text>
                                </View>
                            ) : (
                                <View style={styles.emptySlot} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#f37021',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
    },
    tab: {
        color: '#000',
        fontWeight: 'bold',
    },
    activeTab: {
        color: '#f37021',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#f37021',
    },
    table: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    time: {
        width: '30%',
        fontWeight: 'bold',
        color: '#000',
    },
    details: {
        width: '70%',
        backgroundColor: '#ADD8E6',
        borderRadius: 5,
        padding: 10,
    },
    subject: {
        fontWeight: 'bold',
        color: '#000',
    },
    location: {
        color: '#555',
    },
    type: {
        color: '#777',
        fontStyle: 'italic',
    },
    emptySlot: {
        width: '70%',
        height: 40,
    },
});
