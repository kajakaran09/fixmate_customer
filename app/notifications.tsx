
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Theme
const COLORS = {
    primary: '#2563EB',
    secondary: '#16A34A',
    backgroundLight: '#F1F5F9', // Slate-100
    cardLight: '#FFFFFF',
    textMain: '#0f172a',
    textSub: '#64748b',
    borderLight: '#e2e8f0',
    white: '#FFFFFF',
    blue100: '#dbeafe',
    green50: '#f0fdf4',
    green100: '#dcfce7',
    gray100: '#f1f5f9',
    gray200: '#e2e8f0',
};

export default function NotificationsScreen() {
    const router = useRouter();
    const [filter, setFilter] = useState('All');

    // Helper filter component
    const FilterTab = ({ label }: { label: string }) => (
        <TouchableOpacity
            style={styles.filterTab}
            onPress={() => setFilter(label)}
        >
            <Text style={[
                styles.filterText,
                filter === label ? { color: COLORS.primary } : { color: COLORS.textSub }
            ]}>{label}</Text>
            <View style={[
                styles.filterIndicator,
                filter === label ? { backgroundColor: COLORS.primary } : { backgroundColor: 'transparent' }
            ]} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(241, 245, 249, 0.95)" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.pageTitle}>Notifications</Text>
                    <TouchableOpacity style={styles.markReadBtn}>
                        <MaterialIcons name="done-all" size={24} color={COLORS.textSub} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter Nav */}
            <View style={styles.navContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navContent}>
                    <FilterTab label="All" />
                    <FilterTab label="Bookings" />
                    <FilterTab label="Alerts" />
                    <FilterTab label="Promos" />
                </ScrollView>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Today Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today</Text>
                </View>

                {/* Arriving Notification */}
                <View style={[styles.card, styles.cardBlueBorder]}>
                    <View style={styles.onlineStatus} />
                    <View style={styles.cardRow}>
                        <View style={styles.cardContent}>
                            <View style={styles.metaRow}>
                                <View style={styles.tagBlue}>
                                    <Text style={styles.tagBlueText}>Arriving</Text>
                                </View>
                                <Text style={styles.timeText}>10:42 AM</Text>
                            </View>
                            <Text style={styles.cardTitle}>Kamal is nearby</Text>
                            <Text style={styles.cardBody}>Your electrician is 5 mins away from your location.</Text>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.btnCall}>
                                    <MaterialIcons name="call" size={18} color="white" />
                                    <Text style={styles.btnCallText}>Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnIcon}>
                                    <MaterialIcons name="chat" size={18} color={COLORS.textSub} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.mapPreview}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/150' }}
                                style={styles.mapImage}
                            />
                            <View style={styles.mapOverlay}>
                                <View style={styles.mapAvatarBorder}>
                                    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.mapAvatar} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Job Completed Notification */}
                <View style={[styles.card, styles.cardGreenBorder]}>
                    <View style={[styles.onlineStatus, { backgroundColor: COLORS.primary }]} />
                    <View style={styles.cardPadding}>
                        <View style={styles.rowBetween}>
                            <View>
                                <Text style={styles.cardTitle}>Job Completed</Text>
                                <Text style={styles.subtext}>AC Repair • #BK-2938</Text>
                            </View>
                            <Text style={styles.timeText}>9:15 AM</Text>
                        </View>
                        <Text style={[styles.cardBody, { marginTop: 8 }]}>The service has been marked as complete. How would you rate your experience with Suresh?</Text>

                        <View style={styles.starRow}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <MaterialIcons key={i} name="star" size={28} color="#cbd5e1" />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.rateBtn}
                            onPress={() => router.push('/rate-experience')}
                        >
                            <Text style={styles.rateBtnText}>Rate Service</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Yesterday Section */}
                <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                    <Text style={styles.sectionTitle}>Yesterday</Text>
                </View>

                {/* Promo */}
                <View style={[styles.card, styles.cardBlueBorder]}>
                    <View style={styles.cardRow}>
                        <View style={[styles.cardContent, { justifyContent: 'space-between' }]}>
                            <View>
                                <View style={[styles.tagBlue, { marginBottom: 8, alignSelf: 'flex-start' }]}>
                                    <Text style={styles.tagBlueText}>Promo</Text>
                                </View>
                                <Text style={styles.cardTitle}>20% Off Plumbing</Text>
                                <Text style={styles.cardBody}>Get a discount on your next pipe repair. Valid until Sunday.</Text>
                            </View>
                            <TouchableOpacity style={styles.linkBtn}>
                                <Text style={styles.linkText}>Claim Offer</Text>
                                <MaterialIcons name="arrow-forward" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.promoImage} />
                    </View>
                </View>

                {/* Payment */}
                <View style={[styles.card, styles.cardGrayBorder]}>
                    <View style={[styles.cardRow, { padding: 16, alignItems: 'center' }]}>
                        <View style={styles.iconCircle}>
                            <MaterialIcons name="receipt-long" size={24} color={COLORS.textSub} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text style={styles.cardTitle}>Payment Successful</Text>
                            <Text style={styles.subtext}>LKR 2,500 • Wall Painting</Text>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <MaterialIcons name="download" size={24} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* System Msg */}
                <View style={[styles.card, styles.cardGrayBorder]}>
                    <View style={styles.cardPadding}>
                        <View style={[styles.tagGray, { alignSelf: 'flex-start', marginBottom: 4 }]}>
                            <Text style={styles.tagGrayText}>System</Text>
                        </View>
                        <Text style={styles.cardTitleSmall}>Your password was changed successfully.</Text>
                        <Text style={[styles.timeText, { marginTop: 4 }]}>Yesterday 8:00 PM</Text>
                    </View>
                </View>

                {/* End Mark */}
                <View style={styles.emptyState}>
                    <MaterialIcons name="history" size={32} color="#cbd5e1" />
                    <Text style={styles.emptyText}>No older notifications</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: 'rgba(241, 245, 249, 0.95)',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    markReadBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent', // hover effect not needed on mobile
    },
    navContainer: {
        backgroundColor: COLORS.backgroundLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    navContent: {
        paddingHorizontal: 16,
        gap: 24,
    },
    filterTab: {
        paddingVertical: 12,
        alignItems: 'center',
        minWidth: 40,
    },
    filterText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    filterIndicator: {
        height: 3,
        width: '100%',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    card: {
        backgroundColor: COLORS.cardLight,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
        position: 'relative',
    },
    cardBlueBorder: {
        borderLeftWidth: 6,
        borderLeftColor: COLORS.primary,
    },
    cardGreenBorder: {
        borderLeftWidth: 6,
        borderLeftColor: COLORS.secondary,
    },
    cardGrayBorder: {
        borderLeftWidth: 6,
        borderLeftColor: '#94a3b8',
    },
    onlineStatus: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2563EB', // blue-600
        zIndex: 10,
        shadowColor: '#2563EB',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    cardRow: {
        flexDirection: 'row',
    },
    cardPadding: {
        padding: 16,
        paddingLeft: 24, // increased for border
    },
    cardContent: {
        flex: 1,
        padding: 16,
        paddingLeft: 24,
        paddingRight: 16,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    tagBlue: {
        backgroundColor: COLORS.blue100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagBlueText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1d4ed8', // blue-700
        textTransform: 'uppercase',
    },
    tagGray: {
        backgroundColor: COLORS.gray100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagGrayText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.textSub,
        textTransform: 'uppercase',
    },
    timeText: {
        fontSize: 12,
        color: '#94a3b8', // slate-400
        fontWeight: '500',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 2,
    },
    cardTitleSmall: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMain,
    },
    cardBody: {
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 20,
    },
    subtext: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },
    btnCall: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 16,
        height: 36,
        borderRadius: 8,
        gap: 8,
    },
    btnCallText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    btnIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: COLORS.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapPreview: {
        width: 96,
        height: 96,
        borderRadius: 8,
        margin: 16,
        marginLeft: 0,
        backgroundColor: COLORS.gray200,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.gray100,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    mapOverlay: {
        position: 'absolute',
        inset: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapAvatarBorder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    mapAvatar: {
        width: '100%',
        height: '100%',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    starRow: {
        flexDirection: 'row',
        gap: 4,
        marginVertical: 12,
    },
    rateBtn: {
        height: 40,
        width: '100%',
        backgroundColor: COLORS.green50,
        borderWidth: 1,
        borderColor: COLORS.green100,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateBtnText: {
        color: '#15803d', // green-700
        fontWeight: 'bold',
        fontSize: 14,
    },
    promoImage: {
        width: 96,
        height: 96,
        borderRadius: 8,
        margin: 16,
        marginLeft: 0,
        backgroundColor: COLORS.gray100,
        borderWidth: 1,
        borderColor: COLORS.gray100,
    },
    linkBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 4,
    },
    linkText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downloadBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 48,
        marginBottom: 32,
        opacity: 0.5,
    },
    emptyText: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 8,
    },
});
