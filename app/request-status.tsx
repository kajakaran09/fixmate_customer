
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Theme Colors
const COLORS = {
    primary: '#10B981', // Green
    primaryDark: '#059669',
    secondary: '#3B82F6', // Blue
    secondaryDark: '#2563EB',
    backgroundLight: '#F8FAFC',
    cardLight: '#FFFFFF',
    textMain: '#1E293B',
    textSub: '#64748B',
    borderLight: '#E2E8F0',
    red500: '#ef4444',
    red50: '#fef2f2',
    yellow500: '#eab308',
    yellow50: '#fefce8',
    white: '#FFFFFF',
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function RequestStatusScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Dynamic Header */}
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={[COLORS.secondary, COLORS.secondaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
                        <View style={styles.navBar}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                                <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>REQUEST DETAILS</Text>
                            <TouchableOpacity style={styles.iconBtn}>
                                <MaterialIcons name="help-outline" size={24} color="rgba(255,255,255,0.8)" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statusContent}>
                            <View style={styles.statusIconBox}>
                                <MaterialIcons name="engineering" size={32} color={COLORS.secondary} />
                            </View>
                            <Text style={styles.statusTitle}>In Progress</Text>
                            <Text style={styles.statusSub}>Worker is on the way to your location</Text>

                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>ID: #REQ-2458</Text>
                            </View>
                        </View>
                    </SafeAreaView>

                    {/* Decorative bottom curve */}
                    <View style={styles.bottomCurve} />
                </LinearGradient>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Map Section */}
                <View style={styles.card}>
                    <View style={styles.mapPlaceholder}>
                        {/* In a real app, this would be a MapView */}
                        <Image
                            source={{ uri: 'https://via.placeholder.com/600x300/e2e8f0/94a3b8?text=Map+View' }}
                            style={styles.mapImage}
                        />
                        <View style={styles.centerMarker}>
                            <View style={styles.pingAnimation} />
                            <View style={styles.markerPin}>
                                <MaterialIcons name="two-wheeler" size={14} color="white" />
                            </View>
                        </View>
                        <View style={styles.locateBtn}>
                            <MaterialIcons name="my-location" size={20} color={COLORS.secondary} />
                        </View>
                    </View>

                    <View style={styles.cardPadding}>
                        <View style={styles.locationRow}>
                            <View>
                                <Text style={styles.sectionLabel}>Service Location</Text>
                                <Text style={styles.locationMain}>No. 45, Hospital Road</Text>
                                <Text style={styles.locationSub}>Jaffna, Sri Lanka</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Get Directions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Service Details */}
                <View style={[styles.card, styles.cardPadding]}>
                    <View style={styles.cornerDecor} />

                    <View style={styles.serviceHeader}>
                        <View>
                            <Text style={styles.serviceTitle}>Plumbing Repair</Text>
                            <Text style={styles.serviceSub}>Kitchen sink leakage repair</Text>
                        </View>
                        <View style={styles.serviceIconBadge}>
                            <MaterialIcons name="plumbing" size={24} color="#16a34a" />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.dateTimeGrid}>
                        <View>
                            <View style={styles.iconLabelRow}>
                                <MaterialIcons name="calendar-today" size={14} color={COLORS.textSub} />
                                <Text style={styles.miniLabel}>Date</Text>
                            </View>
                            <Text style={styles.mainValue}>Nov 05, 2023</Text>
                        </View>
                        <View>
                            <View style={styles.iconLabelRow}>
                                <MaterialIcons name="schedule" size={14} color={COLORS.textSub} />
                                <Text style={styles.miniLabel}>Time</Text>
                            </View>
                            <Text style={styles.mainValue}>10:00 - 12:00</Text>
                        </View>
                    </View>

                    <View style={styles.noteBox}>
                        <Text style={styles.noteText}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.textMain }}>Note: </Text>
                            "The pipe under the sink is leaking water continuously. Need urgent fix before it floods the kitchen floor."
                        </Text>
                    </View>
                </View>

                {/* Assigned Pro */}
                <View style={styles.card}>
                    <View style={styles.proHeader}>
                        <View style={styles.proTitleRow}>
                            <MaterialIcons name="badge" size={16} color={COLORS.secondary} />
                            <Text style={styles.proHeaderTitle}>Assigned Pro</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>VERIFIED</Text>
                        </View>
                    </View>

                    <View style={styles.cardPadding}>
                        <View style={styles.proInfoRow}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.avatar}
                                />
                                <View style={styles.starBadge}>
                                    <MaterialIcons name="star" size={10} color="white" />
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.proName}>K. Sivam</Text>
                                <Text style={styles.proSub}>Professional Plumber • 5 Yrs Exp</Text>
                                <View style={styles.ratingRow}>
                                    <View style={styles.ratingBox}>
                                        <Text style={styles.ratingText}>4.8</Text>
                                        <MaterialIcons name="star" size={10} color="#eab308" />
                                    </View>
                                    <Text style={styles.reviewCount}>(120 Reviews)</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.actionGrid}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <MaterialIcons name="call" size={24} color="#15803d" />
                                <Text style={[styles.actionLabel, { color: '#15803d' }]}>Call</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#eff6ff', borderColor: '#dbeafe' }]}>
                                <MaterialIcons name="chat-bubble-outline" size={24} color={COLORS.secondary} />
                                <Text style={[styles.actionLabel, { color: COLORS.secondary }]}>Chat</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }]}>
                                <MaterialIcons name="person-outline" size={24} color={COLORS.textMain} />
                                <Text style={[styles.actionLabel, { color: COLORS.textMain }]}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Timeline */}
                <View style={[styles.card, styles.cardPadding]}>
                    <View style={styles.timelineHeader}>
                        <View style={styles.vertBar} />
                        <Text style={styles.sectionTitle}>Activity Timeline</Text>
                    </View>

                    <View style={styles.timelineContainer}>
                        {/* Item 1 */}
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineLeft}>
                                <View style={[styles.timelineDot, { backgroundColor: COLORS.secondary }]} />
                                <View style={styles.timelineLine} />
                            </View>
                            <View style={styles.timelineContent}>
                                <View style={styles.timelineRow}>
                                    <View>
                                        <Text style={styles.timelineTitle}>Worker Assigned</Text>
                                        <Text style={styles.timelineSub}>K. Sivam accepted your request</Text>
                                    </View>
                                    <View style={styles.timeBadge}>
                                        <Text style={styles.timeText}>10:05 AM</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Item 2 */}
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineLeft}>
                                <View style={[styles.timelineDot, { backgroundColor: '#22c55e' }]} />
                            </View>
                            <View style={styles.timelineContent}>
                                <View style={styles.timelineRow}>
                                    <View>
                                        <Text style={styles.timelineTitle}>Request Created</Text>
                                        <Text style={styles.timelineSub}>You requested plumbing service</Text>
                                    </View>
                                    <View style={styles.timeBadge}>
                                        <Text style={styles.timeText}>09:45 AM</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer Buttons */}
                <View style={styles.footerButtons}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.completeBtnBtnWrapper}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.completeBtn}
                        >
                            <MaterialIcons name="check-circle-outline" size={20} color="white" />
                            <Text style={styles.completeBtnText}>Mark as Completed</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn}>
                        <Text style={styles.cancelBtnText}>Cancel Request</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
        gap: 20,
    },
    headerContainer: {
        overflow: 'hidden',
        backgroundColor: COLORS.secondary,
    },
    headerGradient: {
        paddingBottom: 30,
    },
    safeAreaHeader: {
        //
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    iconBtn: {
        padding: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    statusContent: {
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 20,
    },
    statusIconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    statusSub: {
        fontSize: 14,
        color: '#bfdbfe', // blue-100
        marginBottom: 16,
    },
    idBadge: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    idText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        letterSpacing: 0.5,
    },
    bottomCurve: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: COLORS.backgroundLight,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    card: {
        backgroundColor: COLORS.cardLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        overflow: 'hidden',
    },
    cardPadding: {
        padding: 20,
    },
    mapPlaceholder: {
        height: 180,
        width: '100%',
        backgroundColor: '#e2e8f0',
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
    },
    centerMarker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -16,
        marginTop: -16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pingAnimation: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.secondary,
        opacity: 0.3,
        transform: [{ scale: 1.5 }],
    },
    markerPin: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    locateBtn: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    locationMain: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textMain,
    },
    locationSub: {
        fontSize: 12,
        color: COLORS.textSub,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.secondary,
        textDecorationLine: 'underline',
    },
    cornerDecor: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        borderBottomLeftRadius: 60,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 2,
    },
    serviceSub: {
        fontSize: 14,
        color: COLORS.textSub,
    },
    serviceIconBadge: {
        backgroundColor: '#f0fdf4', // green-50
        padding: 10,
        borderRadius: 12,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 1,
        marginBottom: 16,
    },
    dateTimeGrid: {
        flexDirection: 'row',
        gap: 32,
        marginBottom: 16,
    },
    iconLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    miniLabel: {
        fontSize: 12,
        color: COLORS.textSub,
    },
    mainValue: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMain,
    },
    noteBox: {
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    noteText: {
        fontSize: 12,
        color: COLORS.textSub,
        fontStyle: 'italic',
        lineHeight: 18,
    },
    proHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#eff6ff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0f2fe',
    },
    proTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    proHeaderTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    verifiedBadge: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#bbf7d0',
    },
    verifiedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#15803d',
    },
    proInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: 'white',
    },
    starBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: COLORS.secondary,
        padding: 4,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    proName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 2,
    },
    proSub: {
        fontSize: 12,
        color: COLORS.textSub,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefce8',
        borderColor: '#fef9c3',
        borderWidth: 1,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 2,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ca8a04',
    },
    reviewCount: {
        fontSize: 12,
        color: COLORS.textSub,
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        backgroundColor: '#f0fdf4',
        borderWidth: 1,
        borderColor: '#dcfce7',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
    },
    timelineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    vertBar: {
        width: 4,
        height: 16,
        backgroundColor: COLORS.secondary,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    timelineContainer: {
        marginLeft: 8,
    },
    timelineItem: {
        flexDirection: 'row',
    },
    timelineLeft: {
        alignItems: 'center',
        width: 20,
    },
    timelineDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 3,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        zIndex: 10,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#cbd5e1', // dashed border workaround or solid
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 24,
    },
    timelineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    timelineTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    timelineSub: {
        fontSize: 12,
        color: COLORS.textSub,
        marginTop: 2,
    },
    timeBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    timeText: {
        fontSize: 10,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        color: COLORS.textSub,
    },
    footerButtons: {
        marginBottom: 20,
    },
    completeBtnBtnWrapper: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    completeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    completeBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#fecaca',
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelBtnText: {
        color: COLORS.red500,
        fontSize: 14,
        fontWeight: 'bold',
    },
});
