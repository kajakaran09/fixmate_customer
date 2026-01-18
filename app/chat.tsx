
import React, { useState, useRef } from 'react';
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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Theme Colors
const COLORS = {
    primary: '#0056D2', // Brand Blue
    secondary: '#00A651', // Brand Green
    secondaryDark: '#008f45',
    backgroundLight: '#F2F5F8',
    surfaceLight: '#ffffff',
    surfaceDark: '#1E293B',
    borderLight: '#e2e8f0',
    textMain: '#111827',
    textSub: '#6b7280',
    white: '#FFFFFF',
    chatBubbleReceiver: '#ffffff',
    chatBubbleSender: '#00A651',
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ChatScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All');
    const [chatView, setChatView] = useState(false); // Toggle between list and detail view for demo

    // --- Chat List Component ---
    const ChatList = () => {
        const chats = [
            {
                id: 1,
                name: 'Kamal Perera',
                role: 'Electrician • Colombo 03',
                message: 'I can fix the breaker for LKR 2500',
                time: '2m ago',
                unread: 2,
                verified: true,
                online: true,
                avatar: 'https://via.placeholder.com/150'
            },
            {
                id: 2,
                name: 'Saman Builders',
                role: 'Construction • Kandy',
                message: 'Invoice for roof repair attached.',
                time: 'Yesterday',
                unread: 0,
                verified: false,
                online: false,
                attachment: true,
                avatar: 'https://via.placeholder.com/150'
            },
            {
                id: 3,
                name: 'Nimal Plumbers',
                role: 'Plumbing • Galle',
                message: 'Thank you for the payment.',
                time: 'Oct 24',
                unread: 0,
                verified: false,
                online: false,
                readReceipt: true,
                avatar: 'https://via.placeholder.com/150'
            },
            {
                id: 4,
                name: 'FixMate Support',
                role: 'Automated Message',
                message: 'How was your last service experience?',
                time: 'Oct 20',
                unread: 0,
                verified: false,
                isSupport: true,
                avatar: null
            }
        ];

        return (
            <View style={{ flex: 1 }}>
                {/* Search */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#9ca3af" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search workers..."
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>

                {/* Filter Tabs */}
                <View style={styles.tabScrollContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
                        {['All', 'Unread', 'Active'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.filterTab,
                                    activeTab === tab ? styles.filterTabActive : styles.filterTabInactive
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    activeTab === tab ? styles.filterTextActive : styles.filterTextInactive
                                ]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* List */}
                <ScrollView contentContainerStyle={styles.listContainer}>
                    {chats.map(chat => (
                        <TouchableOpacity key={chat.id} style={styles.chatItem} onPress={() => setChatView(true)}>
                            <View style={styles.avatarContainer}>
                                {chat.isSupport ? (
                                    <View style={[styles.avatar, styles.supportAvatar]}>
                                        <MaterialIcons name="support-agent" size={24} color={COLORS.primary} />
                                    </View>
                                ) : (
                                    <Image source={{ uri: chat.avatar || '' }} style={styles.avatar} />
                                )}
                                {chat.online && <View style={styles.onlineDot} />}
                            </View>

                            <View style={styles.chatInfo}>
                                <View style={styles.chatHeader}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                                        {chat.verified && <MaterialIcons name="verified" size={14} color={COLORS.primary} />}
                                    </View>
                                    <Text style={[styles.timeText, chat.unread > 0 && { color: COLORS.primary, fontWeight: '600' }]}>{chat.time}</Text>
                                </View>

                                <Text style={[styles.chatMsg, chat.unread > 0 && { color: COLORS.textMain, fontWeight: '600' }]} numberOfLines={1}>
                                    {chat.attachment && <MaterialIcons name="attach-file" size={14} color={COLORS.textSub} style={{ marginRight: 4 }} />}
                                    {chat.message}
                                </Text>

                                <Text style={styles.chatRole}>{chat.role}</Text>
                            </View>

                            {chat.unread > 0 ? (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{chat.unread}</Text>
                                </View>
                            ) : chat.readReceipt ? (
                                <MaterialIcons name="done-all" size={16} color="#cbd5e1" />
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* New Chat FAB */}
                <TouchableOpacity style={styles.fab}>
                    <MaterialIcons name="add-comment" size={24} color="white" />
                </TouchableOpacity>

                {/* Main Bottom Nav */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => router.push('/client-home')}>
                        <MaterialIcons name="home" size={26} color={COLORS.textSub} />
                        <Text style={styles.navLabel}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => setChatView(false)}>
                        <MaterialIcons name="chat-bubble" size={26} color={COLORS.primary} />
                        <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>Chats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => router.push('/my-requests')}>
                        <MaterialIcons name="calendar-today" size={24} color={COLORS.textSub} />
                        <Text style={styles.navLabel}>Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => router.push('/profile')}
                    >
                        <MaterialIcons name="person" size={26} color={COLORS.textSub} />
                        <Text style={styles.navLabel}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // --- Detail Chat Component ---
    const ChatDetail = () => {
        const messages = [
            { id: 1, type: 'system', text: 'For safety, keep payments inside FixMate.' },
            { id: 2, type: 'date', text: 'Today' },
            { id: 3, type: 'receive', text: 'Hello! Can you send a photo of the fuse box so I can bring the right parts?', time: '9:20 AM' },
            { id: 4, type: 'send', image: 'https://via.placeholder.com/300x200', text: 'Here it is. It keeps tripping whenever I use the AC.', time: '9:22 AM', read: true },
            { id: 5, type: 'send', audio: true, duration: '0:14', time: '9:23 AM', read: true },
            { id: 6, type: 'typing' }
        ];

        return (
            <View style={{ flex: 1, backgroundColor: COLORS.backgroundLight }}>
                {/* Detail Header */}
                <View style={styles.detailHeader}>
                    <TouchableOpacity onPress={() => setChatView(false)} style={styles.backBtn}>
                        <MaterialIcons name="arrow-back-ios" size={20} color={COLORS.textSub} />
                    </TouchableOpacity>

                    <View style={styles.headerAvatarContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.headerAvatar} />
                        <View style={styles.headerOnlineDot} />
                    </View>

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={styles.headerName}>Kamal Perera</Text>
                            <MaterialIcons name="verified" size={14} color={COLORS.primary} />
                        </View>
                        <Text style={styles.headerStatus}>Online</Text>
                    </View>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={[styles.headerIconBtn, { backgroundColor: 'rgba(0,86,210,0.1)' }]}>
                            <MaterialIcons name="call" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconBtn}>
                            <MaterialIcons name="more-vert" size={20} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Messages Area */}
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
                        {messages.map((msg, idx) => {
                            if (msg.type === 'system') {
                                return (
                                    <View key={msg.id} style={styles.systemMsgContainer}>
                                        <View style={styles.systemMsg}>
                                            <MaterialIcons name="shield" size={14} color="#a16207" />
                                            <Text style={styles.systemMsgText}>{msg.text}</Text>
                                        </View>
                                    </View>
                                );
                            }
                            if (msg.type === 'date') {
                                return (
                                    <View key={msg.id} style={styles.dateSeparator}>
                                        <View style={styles.line} />
                                        <Text style={styles.dateText}>{msg.text}</Text>
                                        <View style={styles.line} />
                                    </View>
                                );
                            }
                            if (msg.type === 'receive') {
                                return (
                                    <View key={msg.id} style={styles.msgRowReceive}>
                                        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.msgAvatar} />
                                        <View>
                                            <View style={styles.bubbleReceive}>
                                                <Text style={styles.msgTextReceive}>{msg.text}</Text>
                                            </View>
                                            <Text style={styles.msgTime}>{msg.time}</Text>
                                        </View>
                                    </View>
                                );
                            }
                            if (msg.type === 'send') {
                                return (
                                    <View key={msg.id} style={styles.msgRowSend}>
                                        <View style={styles.bubbleSendContainer}>
                                            <LinearGradient
                                                colors={[COLORS.secondary, COLORS.secondaryDark]}
                                                style={styles.bubbleSend}
                                            >
                                                {msg.image && (
                                                    <View style={styles.sentImageContainer}>
                                                        <Image source={{ uri: msg.image }} style={styles.sentImage} />
                                                    </View>
                                                )}
                                                {msg.audio && (
                                                    <View style={styles.audioContainer}>
                                                        <View style={styles.playBtn}>
                                                            <MaterialIcons name="play-arrow" size={20} color="white" />
                                                        </View>
                                                        <View style={styles.audioWave}>
                                                            {/* Fake bars */}
                                                            {[3, 5, 4, 8, 3, 2, 7, 3].map((h, i) => (
                                                                <View key={i} style={[styles.bar, { height: h * 2 }]} />
                                                            ))}
                                                        </View>
                                                        <Text style={styles.audioDuration}>{msg.duration}</Text>
                                                    </View>
                                                )}
                                                {msg.text && <Text style={styles.msgTextSend}>{msg.text}</Text>}
                                            </LinearGradient>
                                        </View>
                                        <View style={styles.statusRow}>
                                            <Text style={styles.msgTime}>{msg.time}</Text>
                                            {msg.read && <MaterialIcons name="done-all" size={14} color={COLORS.secondary} />}
                                        </View>
                                    </View>
                                );
                            }
                            if (msg.type === 'typing') {
                                return (
                                    <View key={msg.id} style={styles.msgRowReceive}>
                                        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.msgAvatar} />
                                        <View style={styles.bubbleReceive}>
                                            <View style={styles.typingDots}>
                                                <View style={[styles.dot, { opacity: 0.4 }]} />
                                                <View style={[styles.dot, { opacity: 0.7 }]} />
                                                <View style={[styles.dot, { opacity: 1 }]} />
                                            </View>
                                        </View>
                                    </View>
                                );
                            }
                        })}
                    </ScrollView>

                    {/* Input Area */}
                    <View style={styles.inputArea}>
                        <View style={styles.quickActions}>
                            {['Share Location', 'Request Invoice', 'Book Now'].map((action, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        styles.quickChip,
                                        action === 'Book Now' && { backgroundColor: 'rgba(0,86,210,0.1)', borderColor: 'transparent' }
                                    ]}
                                    onPress={() => {
                                        if (action === 'Book Now') {
                                            router.push('/create-request');
                                        }
                                    }}
                                >
                                    <Text style={[
                                        styles.quickChipText,
                                        action === 'Book Now' && { color: COLORS.primary }
                                    ]}>{action}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.inputRow}>
                            <TouchableOpacity style={styles.attachBtn}>
                                <MaterialIcons name="add" size={24} color={COLORS.primary} />
                            </TouchableOpacity>

                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Type a message..."
                                    placeholderTextColor="#9ca3af"
                                />
                                <TouchableOpacity>
                                    <MaterialIcons name="sentiment-satisfied" size={24} color="#9ca3af" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.micBtn}>
                                <MaterialIcons name="mic" size={24} color={COLORS.textSub} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" backgroundColor={chatView ? COLORS.white : COLORS.backgroundLight} />

            {!chatView ? (
                <>
                    {/* Main Header */}
                    <View style={styles.mainHeader}>
                        <View>
                            <Text style={styles.headerTitle}>Chats</Text>
                            <Text style={styles.headerSubtitle}>Professional Support</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.notifBtn}
                            onPress={() => router.push('/notifications')}
                        >
                            <MaterialIcons name="notifications-none" size={24} color={COLORS.textMain} />
                            <View style={styles.notifDot} />
                        </TouchableOpacity>
                    </View>
                    <ChatList />
                </>
            ) : (
                <ChatDetail />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    // --- Main Header ---
    mainHeader: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    notifBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        position: 'relative',
    },
    notifDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1.5,
        borderColor: COLORS.backgroundLight,
    },
    // --- Chat List Component ---
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        height: 44,
        borderRadius: 12,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: COLORS.textMain,
    },
    tabScrollContainer: {
        paddingVertical: 12,
    },
    tabsContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    filterTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterTabInactive: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.borderLight,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextActive: {
        color: 'white',
    },
    filterTextInactive: {
        color: COLORS.textSub,
    },
    listContainer: {
        paddingHorizontal: 8,
        paddingBottom: 100, // Fab + Nav space
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        marginBottom: 4,
        backgroundColor: 'transparent',
        // Hover effect simulated by TouchOpacity
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    supportAvatar: {
        backgroundColor: 'rgba(0,86,210,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        borderColor: COLORS.backgroundLight,
        borderRadius: 7,
    },
    chatInfo: {
        flex: 1,
        marginRight: 8,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textMain,
        flexShrink: 1,
    },
    timeText: {
        fontSize: 12,
        color: COLORS.textSub,
        fontWeight: '500',
    },
    chatMsg: {
        fontSize: 14,
        color: COLORS.textSub,
        marginBottom: 4,
    },
    chatRole: {
        fontSize: 12,
        color: '#94a3b8', // lighter gray
    },
    unreadBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 90, // Above bottom nav
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    // --- Detail Styles ---
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    backBtn: {
        padding: 8,
        marginRight: 4,
    },
    headerAvatarContainer: {
        position: 'relative',
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerOnlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    headerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMain,
    },
    headerStatus: {
        fontSize: 12,
        color: COLORS.secondary,
        fontWeight: '500',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc', // fallback
    },
    messagesContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 16,
    },
    systemMsgContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    systemMsg: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#fefce8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fef9c3',
    },
    systemMsgText: {
        fontSize: 11,
        color: '#a16207',
    },
    dateSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#cbd5e1',
        opacity: 0.5,
    },
    dateText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9ca3af',
        textTransform: 'uppercase',
    },
    msgRowReceive: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        marginBottom: 16,
        alignSelf: 'flex-start',
        maxWidth: '85%',
    },
    msgRowSend: {
        marginBottom: 16,
        alignSelf: 'flex-end',
        maxWidth: '80%',
        alignItems: 'flex-end',
    },
    msgAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginBottom: 4,
    },
    bubbleReceive: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    bubbleSendContainer: {
        borderRadius: 16,
        borderBottomRightRadius: 4, // bubble tail effect
        overflow: 'hidden',
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    bubbleSend: {
        padding: 4, // inner padding for media, text needs more
        minWidth: 80,
    },
    msgTextReceive: {
        fontSize: 14,
        color: COLORS.textMain,
        lineHeight: 20,
    },
    msgTextSend: {
        fontSize: 14,
        color: 'white',
        padding: 8, // Text specific padding
        lineHeight: 20,
    },
    sentImageContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 2,
    },
    sentImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        paddingRight: 16,
    },
    playBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    audioWave: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        height: 24,
    },
    bar: {
        width: 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 1.5,
    },
    audioDuration: {
        fontSize: 12,
        color: 'white',
        marginLeft: 4,
        fontWeight: '500',
    },
    msgTime: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 4,
        marginLeft: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'flex-end',
        marginRight: 4,
    },
    typingDots: {
        flexDirection: 'row',
        gap: 4,
        padding: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#9ca3af',
    },
    inputArea: {
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    },
    quickActions: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    quickChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    quickChipText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        gap: 8,
    },
    attachBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputWrapper: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        minHeight: 44,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textMain,
        paddingVertical: 10,
    },
    micBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
