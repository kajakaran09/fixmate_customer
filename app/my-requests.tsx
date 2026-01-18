
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
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const COLORS = {
    primary: '#2563EB', // Blue-600
    primaryDark: '#1D4ED8',
    secondary: '#059669', // Emerald-600
    backgroundLight: '#F8FAFC',
    stroke: '#E2E8F0',
    white: '#FFFFFF',
    textDark: '#1E293B',
    textGray: '#64748B',
    statusActive: '#2563EB',
    statusCompleted: '#059669',
    statusPending: '#D97706',
    statusCancelled: '#DC2626',
    bgActive: '#EFF6FF',
    bgCompleted: '#ECFDF5',
    bgPending: '#FFF7ED',
    bgCancelled: '#FEF2F2',
};

export default function MyRequestsScreen() {
    const router = useRouter();
    const [filter, setFilter] = useState('All');

    const requests = [
        {
            id: 1,
            title: 'Electrical Wiring',
            date: 'Nov 05, 10:00 AM',
            status: 'Active',
            progress: 65,
            icon: 'bolt',
            location: '123 Station Rd, Jaffna',
            worker: 'K. Sivam',
            iconBg: '#eff6ff',
            color: COLORS.primary
        },
        {
            id: 2,
            title: 'Pipe Repair',
            date: 'Nov 06, 02:30 PM',
            status: 'Pending',
            icon: 'plumbing',
            location: '45 Hospital Rd, Vavuniya',
            worker: 'Finding best worker...',
            iconBg: '#fff7ed',
            color: COLORS.statusPending
        },
        {
            id: 3,
            title: 'Wall Painting',
            date: 'Oct 26, 09:00 AM',
            status: 'Done',
            icon: 'format-paint',
            location: '88 Main St, Jaffna',
            worker: 'S. Kumar',
            iconBg: '#ecfdf5',
            color: COLORS.statusCompleted
        },
        {
            id: 4,
            title: 'AC Service',
            date: 'Oct 15, 11:30 AM',
            status: 'Cancelled',
            icon: 'ac-unit',
            location: '123 Station Rd, Jaffna',
            worker: null,
            iconBg: '#fef2f2',
            color: COLORS.statusCancelled
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return COLORS.statusActive;
            case 'Pending': return COLORS.statusPending;
            case 'Done': return COLORS.statusCompleted;
            case 'Cancelled': return COLORS.statusCancelled;
            default: return COLORS.textDark;
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'Active': return COLORS.bgActive;
            case 'Pending': return COLORS.bgPending;
            case 'Done': return COLORS.bgCompleted;
            case 'Cancelled': return COLORS.bgCancelled;
            default: return '#f1f5f9';
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Requests</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <MaterialIcons name="search" size={20} color={COLORS.textGray} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search service, worker..."
                        placeholderTextColor={COLORS.textGray}
                    />
                    <TouchableOpacity style={styles.filterIconBtn}>
                        <MaterialIcons name="tune" size={20} color={COLORS.textGray} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {['All', 'Active', 'Completed', 'Cancelled'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tabButton,
                                filter === tab && styles.tabButtonActive,
                                filter !== tab && styles.tabButtonInactive
                            ]}
                            onPress={() => setFilter(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                filter === tab ? styles.tabTextActive : styles.tabTextInactive
                            ]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Request List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {requests.map((item) => (
                    <View key={item.id} style={[styles.card, { borderLeftColor: getStatusColor(item.status), opacity: item.status === 'Cancelled' ? 0.6 : 1 }]}>
                        {/* Card Header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.cardHeaderLeft}>
                                <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                                    <MaterialIcons name={item.icon as any} size={24} color={item.color} />
                                </View>
                                <View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <View style={styles.dateRow}>
                                        <MaterialIcons name="calendar-today" size={12} color={COLORS.textGray} style={{ marginRight: 4 }} />
                                        <Text style={styles.dateText}>{item.date}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                            </View>
                        </View>

                        {/* Progress Bar for Active */}
                        {item.status === 'Active' && (
                            <View style={styles.progressSection}>
                                <View style={styles.progressRow}>
                                    <Text style={styles.progressLabel}>Job in Progress</Text>
                                    <Text style={styles.progressValue}>{item.progress}%</Text>
                                </View>
                                <View style={styles.progressBarBg}>
                                    <View style={{ ...styles.progressBarFill, width: `${(item.progress || 0)}%` as any }} />
                                </View>
                            </View>
                        )}

                        {/* Details Box */}
                        <View style={styles.detailsBox}>
                            <View style={styles.detailRow}>
                                <MaterialIcons name="location-on" size={18} color={item.status === 'Active' ? COLORS.primary : item.color} style={{ marginRight: 8 }} />
                                <Text style={styles.detailText}>{item.location}</Text>
                            </View>
                            {item.status !== 'Cancelled' && (
                                <View style={[styles.detailRow, { marginTop: 4 }]}>
                                    {item.status === 'Pending' ? (
                                        <MaterialIcons name="person-search" size={18} color={item.color} style={{ marginRight: 8 }} />
                                    ) : (
                                        item.status === 'Done' ? (
                                            <MaterialIcons name="verified" size={18} color={item.color} style={{ marginRight: 8 }} />
                                        ) : (
                                            <MaterialIcons name="engineering" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
                                        )
                                    )}
                                    <Text style={[styles.detailText, item.status === 'Pending' && { fontStyle: 'italic' }]}>
                                        {item.status === 'Pending' ? item.worker : (
                                            <Text>
                                                {item.status === 'Done' ? 'Completed by: ' : 'Worker: '}
                                                <Text style={{ fontWeight: '600', color: COLORS.textDark }}>{item.worker}</Text>
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Actions */}
                        <View style={styles.actionRow}>
                            {item.status === 'Active' ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.btnOutline}
                                        onPress={() => router.push('/request-status')}
                                    >
                                        <Text style={styles.btnOutlineText}>Details</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btnPrimary}
                                        onPress={() => router.push('/chat')}
                                    >
                                        <MaterialIcons name="chat" size={18} color="white" style={{ marginRight: 4 }} />
                                        <Text style={styles.btnPrimaryText}>Chat</Text>
                                    </TouchableOpacity>
                                </>
                            ) : item.status === 'Pending' ? (
                                <TouchableOpacity
                                    style={styles.btnOutlineFull}
                                    onPress={() => router.push('/available-workers')}
                                >
                                    <Text style={styles.btnOutlineText}>View Details</Text>
                                </TouchableOpacity>
                            ) : item.status === 'Done' ? (
                                <>
                                    <TouchableOpacity style={styles.btnOutline}>
                                        <Text style={styles.btnOutlineText}>Invoice</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btnOutline, { borderColor: COLORS.statusCompleted }]}>
                                        <MaterialIcons name="star" size={18} color={COLORS.statusCompleted} style={{ marginRight: 4 }} />
                                        <Text style={[styles.btnOutlineText, { color: COLORS.statusCompleted }]}>Review</Text>
                                    </TouchableOpacity>
                                </>
                            ) : null}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-home')}>
                    <MaterialIcons name="home" size={26} color={COLORS.textGray} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/my-requests')}>
                    <View>
                        <MaterialIcons name="history" size={26} color={COLORS.primary} />
                        <View style={styles.navDot} />
                    </View>
                    <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="chat-bubble-outline" size={26} color={COLORS.textGray} />
                    <Text style={styles.navLabel}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="person-outline" size={26} color={COLORS.textGray} />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.backgroundLight,
    },
    backButton: {
        padding: 4,
        borderRadius: 20,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: COLORS.textDark,
        fontSize: 14,
    },
    filterIconBtn: {
        padding: 4,
    },
    tabsContainer: {
        paddingBottom: 4,
    },
    tabsScroll: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 12,
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tabButtonInactive: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.stroke,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: 'white',
    },
    tabTextInactive: {
        color: COLORS.textGray,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        gap: 20,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        borderLeftWidth: 4, // Status color border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        gap: 12,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    progressSection: {
        marginTop: 4,
        marginBottom: 16,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.statusActive,
    },
    progressValue: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textGray,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#f1f5f9',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.statusActive,
        borderRadius: 3,
    },
    detailsBox: {
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 16,
        gap: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 13,
        color: COLORS.textGray,
        flex: 1,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    btnOutline: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnOutlineText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    btnOutlineFull: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnPrimary: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    btnPrimaryText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: COLORS.stroke,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 10,
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
    navDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1.5,
        borderColor: 'white',
    },
});
