
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
// For date/time pickers in a real app you might use @react-native-community/datetimepicker
// Here we will use simple text inputs or buttons for mockups

const COLORS = {
    primary: '#118A7E',
    secondary: '#0F766E',
    backgroundLight: '#F5F7FA',
    backgroundDark: '#121212',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E1E1E',
    textLight: '#1F2937',
    textGray: '#6B7280',
    textGrayLight: '#94a3b8',
    borderLight: '#E5E7EB',
    borderDark: '#374151',
    inputBgLight: '#F3F4F6',
    green50: '#ecfdf5', // nearby theme green
    green100: '#d1fae5',
    teal900: '#134e4a',
};

export default function RequestLocationScreen() {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isFlexible, setIsFlexible] = useState(false);
    const [accessNotes, setAccessNotes] = useState('');

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Request</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Step Indicator */}
                <View style={styles.stepIndicatorContainer}>
                    <View style={styles.stepLabels}>
                        <Text style={styles.stepText}>Step 1</Text>
                        <Text style={styles.stepText}>Step 2</Text>
                        <Text style={[styles.stepText, { color: COLORS.primary, fontWeight: 'bold' }]}>Step 3</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Location & Schedule</Text>

                    <View style={styles.formSection}>
                        {/* Service Location */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Service Location</Text>
                            <View style={styles.locationCard}>
                                <MaterialIcons name="location-on" size={24} color={COLORS.primary} style={{ marginTop: 2 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.locationTitle}>Home</Text>
                                    <Text style={styles.locationSub}>No. 12, Hospital Road, Jaffna</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.editLink}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Preferred Schedule */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Preferred Schedule</Text>
                            <View style={styles.rowGap}>
                                <View style={{ flex: 1, gap: 6 }}>
                                    <Text style={styles.subLabel}>Date</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Select Date"
                                            value={date}
                                            onChangeText={setDate}
                                        />
                                        {/* In real app, onPress open datepicker */}
                                    </View>
                                </View>

                                <View style={{ flex: 1, gap: 6 }}>
                                    <Text style={styles.subLabel}>Time</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Select Time"
                                            value={time}
                                            onChangeText={setTime}
                                        />
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.flexibleRow}
                                activeOpacity={1}
                                onPress={() => setIsFlexible(!isFlexible)}
                            >
                                <View style={[styles.checkbox, isFlexible && styles.checkboxChecked]}>
                                    {isFlexible && <MaterialIcons name="check" size={14} color="white" />}
                                </View>
                                <View>
                                    <Text style={styles.flexibleLabel}>I'm flexible with timing</Text>
                                    <Text style={styles.flexibleSub}>Worker can suggest alternate times</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Access Instructions */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Access Instructions (Optional)</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                multiline
                                numberOfLines={3}
                                placeholder="e.g. Key is under the mat, Gate code 1234"
                                placeholderTextColor={COLORS.textGrayLight}
                                textAlignVertical="top"
                                value={accessNotes}
                                onChangeText={setAccessNotes}
                            />
                        </View>
                    </View>
                </View>

                {/* Navigation Buttons */}
                <View style={styles.navButtonsContainer}>
                    <TouchableOpacity style={styles.backNavBtn} onPress={() => router.back()}>
                        <Text style={styles.backNavText}>← BACK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextNavBtnWrapper}
                        onPress={() => router.push('/review-request')} // Navigate to Step 4 (Final Review)
                    >
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.nextNavBtn}
                        >
                            <Text style={styles.nextNavText}>CONTINUE →</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Bottom Nav Placeholder (Visual) */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-home')}>
                    <MaterialIcons name="home" size={26} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="add-circle" size={26} color={COLORS.primary} />
                    <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="history" size={26} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="chat-bubble-outline" size={26} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="person-outline" size={26} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 8,
    },
    headerButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginLeft: 8,
    },
    stepIndicatorContainer: {
        marginBottom: 32,
    },
    stepLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    stepText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGrayLight,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: COLORS.borderLight,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '100%', // Step 3 roughly full visually as requested, or 75%
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 24,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 32,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    formSection: {
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: COLORS.green50,
        borderWidth: 1,
        borderColor: COLORS.green100,
        borderRadius: 8,
        padding: 16,
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    locationSub: {
        fontSize: 14,
        color: '#4b5563',
        marginTop: 2,
    },
    editLink: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    rowGap: {
        flexDirection: 'row',
        gap: 16,
    },
    subLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    inputWrapper: {
        backgroundColor: COLORS.inputBgLight,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        color: '#111827',
    },
    textArea: {
        minHeight: 80,
    },
    flexibleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d1d5db', // gray-300
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    flexibleLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    flexibleSub: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    navButtonsContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    backNavBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backNavText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
    },
    nextNavBtnWrapper: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    nextNavBtn: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextNavText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        zIndex: 10,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGrayLight,
    },
});
