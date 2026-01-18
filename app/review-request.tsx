
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const COLORS = {
    primary: '#118A7E',
    primaryDark: '#0e7066',
    backgroundLight: '#F5F7FA',
    backgroundDark: '#121212',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E1E1E',
    textLight: '#1F2937',
    textGray: '#6B7280',
    textGrayLight: '#9CA3AF',
    borderLight: '#E5E7EB',
    secondary: '#0E7490',
    sky50: '#f0f9ff',
    sky100: '#e0f2fe',
    sky900: '#0c4a6e',
    emerald600: '#059669',
    emerald700: '#047857',
};

export default function ReviewRequestScreen() {
    const router = useRouter();
    const [agreed, setAgreed] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Review Request</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Progress Step */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressLabels}>
                        <Text style={styles.stepText}>Step 4/4</Text>
                        <Text style={styles.stepLabel}>FINAL REVIEW</Text>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={styles.progressBarFill} />
                    </View>
                </View>

                {/* Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitleRow}>
                            <MaterialIcons name="assignment-turned-in" size={20} color={COLORS.primary} />
                            <Text style={styles.cardHeaderTitle}>Summary</Text>
                        </View>
                        <Text style={styles.serviceId}>Service ID: #REQ-2023</Text>
                    </View>

                    <View style={styles.cardContent}>
                        {/* Service Category */}
                        <View style={styles.detailRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.detailLabel}>SERVICE CATEGORY</Text>
                                <View style={styles.detailValueRow}>
                                    <MaterialIcons name="plumbing" size={18} color="#9CA3AF" />
                                    <Text style={styles.detailValue}>Plumbing</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        {/* Work Description */}
                        <View style={styles.detailRow}>
                            <View style={{ flex: 1, paddingRight: 16 }}>
                                <Text style={styles.detailLabel}>WORK DESCRIPTION</Text>
                                <Text style={styles.descriptionText}>
                                    Leaky kitchen sink pipe. Need urgent repair as water is damaging the cabinet.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        {/* Location */}
                        <View style={styles.detailRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.detailLabel}>LOCATION</Text>
                                <View style={styles.detailValueRow}>
                                    <MaterialIcons name="location-on" size={18} color="#9CA3AF" />
                                    <Text style={styles.detailValue}>No. 12, Hospital Road, Jaffna</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        {/* Preferred Time */}
                        <View style={styles.detailRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.detailLabel}>PREFERRED TIME</Text>
                                <View style={styles.detailValueRow}>
                                    <MaterialIcons name="event" size={18} color="#9CA3AF" />
                                    <Text style={styles.detailValue}>Oct 24, 2023 • 10:00 AM</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIconContainer}>
                        <MaterialIcons name="info" size={20} color={COLORS.secondary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.infoTitle}>WHAT HAPPENS NEXT?</Text>
                        <View style={styles.infoList}>
                            <View style={styles.infoListItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.infoText}>Your request is broadcast to verified pros.</Text>
                            </View>
                            <View style={styles.infoListItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.infoText}>Receive multiple quotes within minutes.</Text>
                            </View>
                            <View style={styles.infoListItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.infoText}>Compare ratings and hire the best fit.</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Terms Checkbox */}
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    activeOpacity={1}
                    onPress={() => setAgreed(!agreed)}
                >
                    <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                        {agreed && <MaterialIcons name="check" size={14} color="white" />}
                    </View>
                    <Text style={styles.checkboxLabel}>
                        I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and confirm the details are correct.
                    </Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButtonWrapper} activeOpacity={0.9}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.emerald600]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitButton}
                    >
                        <View style={styles.submitIcon}>
                            <MaterialIcons name="check" size={20} color="white" />
                        </View>
                        <Text style={styles.submitButtonText}>SUBMIT REQUEST</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>

            {/* Bottom Nav Placeholder (Visual Only to match request) */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-home')}>
                    <MaterialIcons name="home" size={28} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="add-circle" size={28} color={COLORS.primary} />
                    <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="history" size={28} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="chat-bubble-outline" size={28} color={COLORS.textGrayLight} />
                    <Text style={styles.navLabel}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="person-outline" size={28} color={COLORS.textGrayLight} />
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
        paddingBottom: 100, // Space for bottom nav
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginLeft: 8,
    },
    progressContainer: {
        marginBottom: 24,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 6,
    },
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    stepLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGray,
        letterSpacing: 1,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
        backgroundColor: '#F9FAFB',
    },
    cardHeaderTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardHeaderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    serviceId: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    cardContent: {
        padding: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    detailLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9CA3AF',
        letterSpacing: 1,
        marginBottom: 6,
    },
    detailValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textLight,
    },
    descriptionText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    editButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#eff6ff', // blue-50 placeholder-like
        marginTop: -4,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        borderStyle: 'dashed', // React Native doesn't support borderStyle on View nicely without borderWidth, simple line is safer or use images for dashed
        // approximating dashed line visual with opacity
        opacity: 0.5,
        marginVertical: 16,
    },
    infoBox: {
        backgroundColor: COLORS.sky50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.sky100,
        padding: 16,
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    infoIconContainer: {
        backgroundColor: COLORS.sky100,
        padding: 8,
        borderRadius: 8,
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.sky900,
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    infoList: {
        gap: 8,
    },
    infoListItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.secondary,
        marginTop: 5,
    },
    infoText: {
        fontSize: 12,
        color: '#075985', // sky-800
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        backgroundColor: 'white',
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 13,
        color: '#4B5563',
        lineHeight: 20,
    },
    linkText: {
        color: COLORS.primary,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    submitButtonWrapper: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    submitIcon: {
        // Optional: bounce animation if needed
    },
    submitButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGray,
    },
});
