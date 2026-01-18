
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    Image,
    Dimensions,
    SafeAreaView as SafeAreaViewContext,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Theme Colors
const COLORS = {
    primary: '#118976',
    primaryDark: '#0d6e5e',
    secondaryBlue: '#3B82F6',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E1E1E',
    backgroundLight: '#F8FAFC',
    backgroundDark: '#0F172A',
    text: '#1e293b', // slate-800
    textLight: '#f8fafc',
    slatemuted: '#64748b', // slate-500
    emerald50: '#ecfdf5',
    emerald100: '#d1fae5',
    white: '#ffffff',
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ClientDashboard() {
    const router = useRouter();

    const categories = [
        { id: 1, name: 'Electrical', icon: 'lightbulb', color: '#f97316' }, // orange-500
        { id: 2, name: 'Plumbing', icon: 'plumbing', color: '#3b82f6' }, // blue-500
        { id: 3, name: 'AC Repair', icon: 'ac-unit', color: '#06b6d4' }, // cyan-500
        { id: 4, name: 'Cleaning', icon: 'cleaning-services', color: '#a855f7' }, // purple-500
        { id: 5, name: 'Painting', icon: 'format-paint', color: '#ec4899' }, // pink-500
    ];

    const recentHistory = [
        { id: 1, name: 'Plumbing Repair', date: '26 Oct 2023', status: 'Completed', icon: 'check-circle', color: '#10b981', bgColor: '#ecfdf5' },
        { id: 2, name: 'Garden Cleaning', date: '15 Oct 2023', status: 'Cancelled', icon: 'cancel', color: '#ef4444', bgColor: '#fef2f2' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Footer Navigation - Fixed at bottom */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <View style={styles.navIconActiveContainer}>
                        <MaterialIcons name="home" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/my-requests')}
                >
                    <MaterialIcons name="history" size={24} color="#94a3b8" />
                    <Text style={styles.navLabel}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/chat')}
                >
                    <MaterialIcons name="chat-bubble-outline" size={24} color="#94a3b8" />
                    <Text style={styles.navLabel}>Chats</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/profile')}
                >
                    <MaterialIcons name="person-outline" size={24} color="#94a3b8" />
                    <Text style={styles.navLabel}>Profile</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section with Gradient */}
                <View style={styles.headerContainer}>
                    <LinearGradient
                        colors={['#065F46', '#14B8A6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.headerGradient}
                    >
                        {/* Abstract Background Shapes */}
                        <View style={styles.headerCircle1} />
                        <View style={styles.headerCircle2} />

                        <SafeAreaView edges={['top']} style={styles.safeAreaHeader}>
                            {/* User Info Row */}
                            <View style={styles.userInfoRow}>
                                <View>
                                    <Text style={styles.welcomeLabel}>Welcome back,</Text>
                                    <Text style={styles.userName}>John Doe</Text>
                                </View>
                                <View style={styles.userAvatar}>
                                    <MaterialIcons name="person" size={24} color="white" />
                                </View>
                            </View>

                            {/* Location & Notification */}
                            <View style={styles.locationRow}>
                                <View style={styles.locationBadge}>
                                    <MaterialIcons name="location-on" size={18} color="white" />
                                    <Text style={styles.locationText}>Jaffna, Sri Lanka</Text>
                                    <MaterialIcons name="keyboard-arrow-down" size={16} color="white" />
                                </View>

                                <TouchableOpacity
                                    style={styles.notificationBtn}
                                    onPress={() => router.push('/notifications')}
                                >
                                    <MaterialIcons name="notifications" size={20} color="white" />
                                    <View style={styles.notificationDot} />
                                </TouchableOpacity>
                            </View>

                            {/* Search Bar */}
                            <View style={styles.searchContainer}>
                                <View style={styles.searchIconWrapper}>
                                    <MaterialIcons name="search" size={20} color="rgba(209, 250, 229, 0.7)" />
                                </View>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Find a service (e.g. Electrician)"
                                    placeholderTextColor="rgba(209, 250, 229, 0.6)"
                                />
                                <TouchableOpacity style={styles.filterBtn}>
                                    <MaterialIcons name="tune" size={18} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                </View>

                {/* Categories Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
                        {categories.map((cat) => (
                            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
                                <View style={styles.categoryIconContainer}>
                                    {/* Using FontAwesome5 or MaterialIcons dynamically */}
                                    <MaterialIcons name={cat.icon as any} size={28} color={cat.color} />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Active Request Card */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Active Request</Text>
                    <TouchableOpacity
                        style={styles.activeRequestCard}
                        activeOpacity={0.9}
                        onPress={() => router.push('/request-status')}
                    >
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>In Progress</Text>
                        </View>

                        <View style={styles.requestContent}>
                            <View style={styles.requestIconBox}>
                                <MaterialIcons name="build" size={24} color={COLORS.primary} />
                            </View>
                            <View>
                                <Text style={styles.requestTitle}>Electrical Work</Text>
                                <View style={styles.requestDetail}>
                                    <MaterialIcons name="schedule" size={14} color={COLORS.slatemuted} />
                                    <Text style={styles.requestDetailText}>Today, 2:00 PM</Text>
                                </View>
                                <View style={styles.requestDetail}>
                                    <MaterialIcons name="person" size={14} color={COLORS.slatemuted} />
                                    <Text style={styles.requestDetailText}>Worker: K. Sivam</Text>
                                </View>
                            </View>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.progressBarBg}>
                            <LinearGradient
                                colors={['#34d399', COLORS.primary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.progressBarFill}
                            />
                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.footerStatusText}>Worker is on the way...</Text>
                            <TouchableOpacity style={styles.viewDetailsBtn}>
                                <Text style={styles.viewDetailsText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Create Request Button */}
                <View style={[styles.sectionContainer, { marginTop: 8 }]}>
                    <TouchableOpacity
                        style={styles.createRequestBtn}
                        activeOpacity={0.9}
                        onPress={() => router.push('/create-request')}
                    >
                        <LinearGradient
                            colors={[COLORS.primary, '#34d399']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.createRequestGradient}
                        >
                            <MaterialIcons name="add-circle" size={24} color="white" />
                            <Text style={styles.createRequestText}>Create New Work Request</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Recent History */}
                <View style={[styles.sectionContainer, { paddingBottom: 100 }]}>
                    <Text style={styles.sectionTitle}>Recent History</Text>
                    <View style={styles.historyList}>
                        {recentHistory.map((item) => (
                            <View key={item.id} style={styles.historyItem}>
                                <View style={styles.historyLeft}>
                                    <View style={[styles.historyIconBox, { backgroundColor: item.bgColor }]}>
                                        <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                                    </View>
                                    <View>
                                        <Text style={styles.historyName}>{item.name}</Text>
                                        <Text style={styles.historyDate}>{item.date}</Text>
                                    </View>
                                </View>
                                <View style={[
                                    styles.historyBadge,
                                    { backgroundColor: item.status === 'Completed' ? '#d1fae5' : '#f1f5f9' }
                                ]}>
                                    <Text style={[
                                        styles.historyBadgeText,
                                        { color: item.status === 'Completed' ? '#047857' : '#64748b' }
                                    ]}>{item.status}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
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
        paddingBottom: 20,
    },
    headerContainer: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 20,
    },
    headerGradient: {
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    safeAreaHeader: {
        // paddingTop handled by safe area context
    },
    headerCircle1: {
        position: 'absolute',
        top: -64,
        right: -64,
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: 'rgba(255,255,255,0.05)',
        zIndex: 0,
    },
    headerCircle2: {
        position: 'absolute',
        bottom: -40,
        left: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 0,
    },
    userInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 10,
    },
    welcomeLabel: {
        color: COLORS.emerald100,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    userName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    locationText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
        marginHorizontal: 6,
    },
    notificationBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444', // red-500
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 52,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    searchIconWrapper: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: 'white',
        fontSize: 15,
    },
    filterBtn: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 12,
        marginLeft: 8,
    },
    sectionContainer: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    categoriesScroll: {
        paddingRight: 24,
        gap: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 4,
    },
    categoryIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    categoryName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#475569',
    },
    activeRequestCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(59, 130, 246, 0.1)', // Light blue tint
        shadowColor: COLORS.secondaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        overflow: 'hidden',
    },
    statusBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#eff6ff', // blue-50
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderBottomLeftRadius: 16,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondaryBlue,
        letterSpacing: 0.5,
    },
    requestContent: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 20,
    },
    requestIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#ecfdf5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#d1fae5',
    },
    requestTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    requestDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    requestDetailText: {
        fontSize: 12,
        color: COLORS.slatemuted,
        marginLeft: 4,
        fontWeight: '500',
    },
    progressBarBg: {
        height: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 5,
        marginBottom: 16,
        overflow: 'hidden',
    },
    progressBarFill: {
        width: '65%',
        height: '100%',
        borderRadius: 5,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4,
    },
    footerStatusText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.slatemuted,
    },
    viewDetailsBtn: {
        backgroundColor: '#eff6ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    viewDetailsText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondaryBlue,
    },
    createRequestBtn: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    createRequestGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 12,
    },
    createRequestText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    historyList: {
        gap: 16,
    },
    historyItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    historyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    historyName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    historyDate: {
        fontSize: 12,
        color: COLORS.slatemuted,
        marginTop: 2,
    },
    historyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    historyBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        zIndex: 100,
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIconActiveContainer: {
        backgroundColor: '#ecfdf5',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 16,
        marginBottom: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
        marginTop: 2,
    },
});
