
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Theme Colors from request
const COLORS = {
    primary: '#0df259',
    primaryDark: '#0bbf46',
    secondaryBlue: '#0d8df2',
    backgroundLight: '#f5f8f6',
    backgroundDark: '#102216',
    surfaceLight: '#ffffff',
    surfaceDark: '#1a3324',
    textMain: '#111813',
    textMuted: '#608a6e',
    borderColor: '#dbe6df',
    white: '#ffffff',
};

// Box Shadows
const SHADOWS = {
    soft: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 5,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
};

export default function LoginScreen() {
    const router = useRouter();
    const { height } = useWindowDimensions();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleLogin = () => {
        // Implement login logic here
        console.log('Login attempt:', formData);
        Alert.alert('Login', 'Login functionality would go here');
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert('Social Login', `Login with ${provider} would go here`);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="dark" />

            {/* Decorative Background Blobs - Simplified with opacity views */}
            <View style={styles.blobTop} />
            <View style={styles.blobBottom} />

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { minHeight: height }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>

                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoWrapper}>
                            <LinearGradient
                                colors={['#e6ffee', '#ccfdd9']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.logoBackground}
                            >
                                <MaterialIcons name="handyman" size={40} color={COLORS.primary} />
                            </LinearGradient>
                        </View>

                        <View style={styles.titleWrapper}>
                            <Text style={styles.appName}>FixMate Lanka</Text>
                            <Text style={styles.tagline}>Expert repairs at your doorstep</Text>
                        </View>
                    </View>

                    {/* Welcome Text */}
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <View style={[
                                styles.inputContainer,
                                activeField === 'email' && styles.inputActive
                            ]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email or Phone Number"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField(null)}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                                <MaterialIcons name="mail" size={20} color={COLORS.textMuted} style={styles.inputIconRight} />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <View style={[
                                styles.inputContainer,
                                activeField === 'password' && styles.inputActive
                            ]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.textMuted}
                                    value={formData.password}
                                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                                    onFocus={() => setActiveField('password')}
                                    onBlur={() => setActiveField(null)}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIconButton}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <MaterialIcons
                                        name={showPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color={COLORS.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.buttonWrapper}
                            onPress={handleLogin}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Sign In</Text>
                                <MaterialIcons name="arrow-forward" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialLogin('Google')}
                        >
                            <Ionicons name="logo-google" size={20} color="#EA4335" style={{ marginRight: 8 }} />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialLogin('Facebook')}
                        >
                            <Ionicons name="logo-facebook" size={20} color="#1877F2" style={{ marginRight: 8 }} />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }} />

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            Don't have an account?{' '}
                            <Link href="/signup" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surfaceLight,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 30,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    blobTop: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.primary,
        opacity: 0.1,
        // Note: blurRadius allows native blurring on Image, but for View we rely on opacity for "soft" look
        // or we could use expo-blur if it was an overlay. 
        // Simplified "blob" effect.
    },
    blobBottom: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: COLORS.secondaryBlue,
        opacity: 0.1,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    logoWrapper: {
        marginBottom: 24,
        ...SHADOWS.soft,
    },
    logoBackground: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleWrapper: {
        alignItems: 'center',
        gap: 4,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111813', // Gradient text is hard in RN without MaskedView, using fallback solid color or we can try a hack, but solid is safer.
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 15,
        color: COLORS.textMuted,
        fontWeight: '500',
        textAlign: 'center',
    },
    welcomeContainer: {
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textMain,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        gap: 16,
    },
    inputGroup: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    inputActive: {
        borderColor: COLORS.primary,
        // Ring effect not supported directly, strictly
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: COLORS.textMain,
    },
    inputIconRight: {
        marginLeft: 10,
    },
    eyeIconButton: {
        padding: 8,
        marginRight: -8,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: -8,
    },
    forgotPasswordText: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.secondaryBlue,
    },
    buttonWrapper: {
        marginTop: 8,
        ...SHADOWS.soft,
    },
    button: {
        height: 52,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
        width: '100%',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.borderColor,
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.textMuted,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        marginBottom: 24,
    },
    socialButton: {
        flex: 1,
        height: 48,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.card,
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textMain,
    },
    footerContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: COLORS.textMuted,
    },
    linkText: {
        color: COLORS.secondaryBlue,
        fontWeight: '600',
        top: 3.5,
    },
});
