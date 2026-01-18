
import React, { useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Theme Colors
const COLORS = {
    primary: '#10B981',
    primaryDark: '#059669',
    secondary: '#3B82F6',
    backgroundLight: '#F8FAFC',
    cardLight: '#FFFFFF',
    textMain: '#1E293B',
    textSub: '#64748B',
    borderLight: '#E2E8F0',
    white: '#FFFFFF',
    yellow400: '#facc15',
    green50: '#f0fdf4',
    green100: '#dcfce7',
    blue50: '#eff6ff',
    blue100: '#dbeafe',
    gray100: '#f1f5f9',
};

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width;
const ITEM_WIDTH = width * 0.85;

export default function SelectProfessionalScreen() {
    const router = useRouter();
    const scrollX = useRef(new Animated.Value(0)).current;

    const workers = [
        {
            id: 1,
            name: 'K. Sivam',
            role: 'Senior Plumber',
            rating: 4.8,
            reviews: 120,
            distance: '1.2 km',
            experience: '5 Yrs',
            verified: true,
            image: 'https://via.placeholder.com/150', // Replace with real URL in prod
            gradientColors: [COLORS.primary, COLORS.secondary]
        },
        {
            id: 2,
            name: 'N. Ravi',
            role: 'Plumber',
            rating: 4.5,
            reviews: 85,
            distance: '2.5 km',
            experience: '3 Yrs',
            verified: true,
            image: 'https://via.placeholder.com/150',
            gradientColors: ['#d1d5db', '#9ca3af'] // Gray gradient
        }
    ];

    interface Worker {
        id: number;
        name: string;
        role: string;
        rating: number;
        reviews: number;
        distance: string;
        experience: string;
        verified: boolean;
        image: string;
        gradientColors: string[];
    }

    const renderWorkerCard = (item: Worker, index: number) => {
        return (
            <View key={item.id} style={styles.cardContainer}>
                <View style={styles.card}>
                    {item.verified && (
                        <View style={styles.verifiedBadge}>
                            <MaterialIcons name="verified" size={14} color={COLORS.primary} />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    )}

                    <View style={styles.avatarWrapper}>
                        <LinearGradient
                            colors={item.gradientColors as any}
                            style={styles.avatarGradient}
                        >
                            <View style={styles.avatarBorder}>
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.infoCenter}>
                        <Text style={styles.workerName}>{item.name}</Text>
                        <Text style={styles.workerRole}>{item.role}</Text>
                        <View style={styles.ratingRow}>
                            <MaterialIcons name="star" size={18} color={COLORS.yellow400} />
                            <Text style={styles.ratingScore}>{item.rating}</Text>
                            <Text style={styles.reviewCount}>({item.reviews})</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Distance</Text>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>{item.distance}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Experience</Text>
                            <Text style={[styles.statValue, { color: COLORS.secondary }]}>{item.experience}</Text>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={styles.iconBtnRound}
                            onPress={() => router.push('/chat')}
                        >
                            <MaterialIcons name="chat-bubble" size={20} color={COLORS.secondary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mainActionBtn}
                            activeOpacity={0.9}
                            onPress={() => router.push('/request-status')} // Simulate selection -> go to status
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                style={styles.mainActionGradient}
                            >
                                <MaterialIcons name="check" size={32} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.iconBtnRound, { backgroundColor: COLORS.green50 }]}>
                            <MaterialIcons name="call" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Professional</Text>
                <TouchableOpacity style={styles.headerBtn}>
                    <MaterialIcons name="tune" size={24} color={COLORS.textMain} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>

                {/* AI Match Banner */}
                <View style={styles.bannerContainer}>
                    <LinearGradient
                        colors={['rgba(16, 185, 129, 0.1)', 'rgba(255, 255, 255, 1)', 'rgba(59, 130, 246, 0.1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.bannerGradient}
                    >
                        <View style={styles.bannerIconAbs}>
                            <MaterialIcons name="smart-toy" size={64} color={COLORS.primary} style={{ opacity: 0.1 }} />
                        </View>

                        <View>
                            <View style={styles.aiLabelRow}>
                                <Text style={styles.aiLabelText}>FixMate AI Match</Text>
                                <MaterialIcons name="auto-awesome" size={14} color={COLORS.primary} />
                            </View>
                            <Text style={styles.bannerTitle}>We found 2 Top Pros</Text>
                            <Text style={styles.bannerSub}>Based on your plumbing request, these verified workers are your best match.</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Horizontal Scroll List */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    snapToInterval={ITEM_WIDTH + 20} // Width + gap
                    decelerationRate="fast"
                    contentContainerStyle={styles.cardsScroll}
                    showsHorizontalScrollIndicator={false}
                >
                    {workers.map((worker, index) => renderWorkerCard(worker, index))}
                    <View style={{ width: 20 }} />
                </ScrollView>

            </View>

            {/* Sim button for demo */}
            <View style={styles.bottomArea}>
                <TouchableOpacity style={styles.simBtn}>
                    <Text style={styles.simBtnText}>Simulate Worker Response</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10,
    },
    bannerContainer: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    bannerGradient: {
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
        overflow: 'hidden',
        position: 'relative',
    },
    bannerIconAbs: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 12,
    },
    aiLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    aiLabelText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary, // Simple fallback for gradient text
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 4,
    },
    bannerSub: {
        fontSize: 14,
        color: COLORS.textSub,
        lineHeight: 20,
    },
    cardsScroll: {
        paddingHorizontal: 24,
        // alignItems: 'center', // Center vertically if needed
        paddingBottom: 20,
        gap: 20,
    },
    cardContainer: {
        width: ITEM_WIDTH,
    },
    card: {
        backgroundColor: COLORS.cardLight,
        borderRadius: 32,
        padding: 24,
        shadowColor: 'rgba(16, 185, 129, 0.1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5,
        position: 'relative',
    },
    verifiedBadge: {
        position: 'absolute',
        top: 24,
        right: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: COLORS.green50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.green100,
        zIndex: 10,
    },
    verifiedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    avatarWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignSelf: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 48,
        padding: 4,
    },
    avatarBorder: {
        flex: 1,
        borderRadius: 48,
        backgroundColor: 'white',
        padding: 4,
    },
    avatar: {
        flex: 1,
        borderRadius: 48,
        resizeMode: 'cover',
    },
    infoCenter: {
        alignItems: 'center',
        marginBottom: 24,
    },
    workerName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 4,
    },
    workerRole: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
    },
    ratingScore: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    reviewCount: {
        fontSize: 12,
        color: COLORS.textSub,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 16,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray100,
    },
    statLabel: {
        fontSize: 10,
        color: COLORS.textSub,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 'auto',
    },
    iconBtnRound: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.blue50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainActionBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    mainActionGradient: {
        flex: 1,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomArea: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    simBtn: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    simBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textSub,
    },
});
