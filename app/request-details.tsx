
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Theme Colors
const COLORS = {
    primary: '#118A7E',
    primaryDark: '#0D6E64',
    backgroundLight: '#F8FAFC',
    backgroundDark: '#121212',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E1E1E',
    textLight: '#334155',
    textDark: '#E2E8F0',
    borderLight: '#E2E8F0',
    borderDark: '#3f3f46',
    gray500: '#64748b',
    gray400: '#94a3b8',
    red500: '#ef4444',
    red50: '#fef2f2',
};

export default function RequestDetailsScreen() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('normal'); // 'low', 'normal', 'high'

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#334155" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Request Details</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <MaterialIcons name="help-outline" size={24} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Progress Bar */}
                    <View style={styles.progressSection}>
                        <View style={styles.progressLabels}>
                            <Text style={[styles.progressText, { color: COLORS.primary, fontWeight: 'bold' }]}>Category</Text>
                            <Text style={[styles.progressText, { color: COLORS.primary, fontWeight: 'bold' }]}>Details</Text>
                            <Text style={styles.progressText}>Review</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressBarFill, { width: '66%' }]}
                            />
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formContainer}>

                        {/* Description Input */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>Describe the Work</Text>
                                <View style={styles.requiredBadge}>
                                    <Text style={styles.requiredText}>Required</Text>
                                </View>
                            </View>
                            <View style={styles.textAreaContainer}>
                                <TextInput
                                    style={styles.textArea}
                                    multiline
                                    numberOfLines={6}
                                    placeholder="Please describe what needs to be fixed. Include details like 'leaking tap in kitchen' or 'fan not spinning'..."
                                    placeholderTextColor="#94a3b8"
                                    value={description}
                                    onChangeText={setDescription}
                                    textAlignVertical="top"
                                />
                                <View style={styles.charCount}>
                                    <Text style={styles.charCountText}>{description.length}/500</Text>
                                </View>
                            </View>
                        </View>

                        {/* Photos Section */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Photos (Optional)</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoList}>
                                {/* Add Photo Button */}
                                <TouchableOpacity style={styles.addPhotoBtn}>
                                    <MaterialIcons name="add-a-photo" size={24} color={COLORS.primary} />
                                    <Text style={styles.addPhotoText}>Add</Text>
                                </TouchableOpacity>

                                {/* Placeholder Images Mock */}
                                <View style={styles.photoItem}>
                                    <Image
                                        source={{ uri: 'https://via.placeholder.com/150' }}
                                        style={styles.photoImage}
                                    // In real app use actual uris
                                    />
                                    <TouchableOpacity style={styles.removePhotoBtn}>
                                        <MaterialIcons name="close" size={12} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.photoItem}>
                                    <View style={[styles.photoImage, { backgroundColor: '#cbd5e1' }]} />
                                    {/* Placeholder gray box since we don't have valid external uris handy */}
                                    <TouchableOpacity style={styles.removePhotoBtn}>
                                        <MaterialIcons name="close" size={12} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            <Text style={styles.helperText}>Add up to 5 photos to help workers understand the issue.</Text>
                        </View>

                        {/* Urgency Level */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Urgency Level</Text>
                            <View style={styles.urgencyGrid}>

                                {/* Low */}
                                <TouchableOpacity
                                    style={[styles.urgencyCard, urgency === 'low' && styles.urgencyCardActive]}
                                    onPress={() => setUrgency('low')}
                                >
                                    <Text style={[styles.urgencyTitle, urgency === 'low' ? { fontWeight: 'bold' } : null]}>Low</Text>
                                    <Text style={styles.urgencySub}>Within week</Text>
                                </TouchableOpacity>

                                {/* Normal */}
                                <TouchableOpacity
                                    style={[
                                        styles.urgencyCard,
                                        urgency === 'normal' ? styles.urgencyCardPrimary : null
                                    ]}
                                    onPress={() => setUrgency('normal')}
                                >
                                    <Text style={[styles.urgencyTitle, urgency === 'normal' ? { color: COLORS.primary } : null]}>Normal</Text>
                                    <Text style={[styles.urgencySub, urgency === 'normal' ? { color: COLORS.primary } : null]}>Tomorrow</Text>
                                    {urgency === 'normal' && (
                                        <View style={styles.checkBadge}>
                                            <MaterialIcons name="check" size={10} color="white" />
                                        </View>
                                    )}
                                </TouchableOpacity>

                                {/* High */}
                                <TouchableOpacity
                                    style={[styles.urgencyCard, urgency === 'high' && styles.urgencyCardHigh]}
                                    onPress={() => setUrgency('high')}
                                >
                                    <Text style={[
                                        styles.urgencyTitle,
                                        urgency === 'high' ? { color: COLORS.red500 } : null
                                    ]}>High</Text>
                                    <Text style={[
                                        styles.urgencySub,
                                        urgency === 'high' ? { color: COLORS.red500 } : null
                                    ]}>Today</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </ScrollView>

                {/* Bottom Bar */}
                <View style={styles.bottomBar}>
                    <View style={styles.bottomBarContent}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={18} color={COLORS.textLight} />
                            <Text style={styles.backBtnText}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.continueBtnWrapper}
                            onPress={() => router.push('/request-location')} // Go to step 3
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.continueBtn}
                            >
                                <Text style={styles.continueBtnText}>CONTINUE</Text>
                                <MaterialIcons name="arrow-forward" size={18} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerButton: {
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    progressSection: {
        paddingHorizontal: 20,
        marginTop: 8,
        marginBottom: 24,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#94a3b8',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#e2e8f0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    formContainer: {
        paddingHorizontal: 20,
        gap: 24,
    },
    inputGroup: {
        gap: 12,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    requiredBadge: {
        backgroundColor: 'rgba(17, 138, 126, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    requiredText: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.primary,
    },
    textAreaContainer: {
        position: 'relative',
    },
    textArea: {
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        minHeight: 140,
        fontSize: 14,
        color: '#0f172a',
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    charCountText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#94a3b8',
    },
    photoList: {
        flexDirection: 'row',
        gap: 12,
    },
    addPhotoBtn: {
        width: 80,
        height: 80,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(17, 138, 126, 0.3)',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(17, 138, 126, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    addPhotoText: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.primary,
    },
    photoItem: {
        width: 80,
        height: 80,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
        position: 'relative',
    },
    photoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    removePhotoBtn: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helperText: {
        fontSize: 12,
        color: '#64748b',
    },
    urgencyGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    urgencyCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
    },
    urgencyCardActive: {
        // Default active state style if needed
    },
    urgencyCardPrimary: {
        backgroundColor: 'rgba(17, 138, 126, 0.05)',
        borderColor: 'rgba(17, 138, 126, 0.3)',
        borderWidth: 1.5,
    },
    urgencyCardHigh: {
        borderColor: '#fca5a5', // red-200
        backgroundColor: '#fef2f2', // red-50
    },
    urgencyTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        marginBottom: 4,
    },
    urgencySub: {
        fontSize: 10,
        color: '#94a3b8',
    },
    checkBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: COLORS.primary,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    },
    bottomBarContent: {
        flexDirection: 'row',
        gap: 16,
    },
    backBtn: {
        flex: 1,
        height: 52,
        borderRadius: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    backBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    continueBtnWrapper: {
        flex: 2,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueBtn: {
        flex: 1,
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    continueBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});
