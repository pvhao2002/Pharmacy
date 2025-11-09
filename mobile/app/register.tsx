import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import {APP_CONFIG, ENV} from '@/constants/app-config';
import {useAuthStore} from '@/store/authStore';
import {useRouter} from 'expo-router';

export default function RegisterScreen() {
    const router = useRouter();
    const loginStore = useAuthStore((s) => s.login);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (k: string, v: string) => {
        setForm((prev) => ({...prev, [k]: v}));
    };

    const handleRegister = async () => {
        const {firstName, lastName, email, password} = form;
        if (!firstName || !lastName || !email || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);
            const param = {
                ...form,
                fullName: `${form.firstName} ${form.lastName}`,
            };
            console.log(param)
            const res = await axios.post(`${ENV.BASE_URL}${APP_CONFIG.API.AUTH.REGISTER}`, param);
            const data = res.data;
            if (data) {
                loginStore(data);
                Alert.alert('Success', 'Account created successfully!');
                router.replace('/(tabs)/profile');
            } else {
                Alert.alert('Error', 'Unexpected server response');
            }
        } catch (err: any) {
            console.log(err);
            Alert.alert('Registration failed', err.response?.data?.message || 'Please check your details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: '#F9FAFB'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
                <View style={s.header}>
                    <Text style={s.headerTitle}>Start Your Journey</Text>
                    <Text style={s.headerSubtitle}>Join the pharmacy community today</Text>
                </View>

                <View style={s.formBox}>
                    <View style={s.row}>
                        <TextInput
                            placeholder="First name"
                            style={s.inputHalf}
                            value={form.firstName}
                            onChangeText={(v) => handleChange('firstName', v)}
                            placeholderTextColor="#94a3b8"
                        />
                        <TextInput
                            placeholder="Last name"
                            style={s.inputHalf}
                            value={form.lastName}
                            onChangeText={(v) => handleChange('lastName', v)}
                            placeholderTextColor="#94a3b8"
                        />
                    </View>

                    <TextInput
                        placeholder="Email address"
                        style={s.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        onChangeText={(v) => handleChange('email', v)}
                        placeholderTextColor="#94a3b8"
                    />

                    <TextInput
                        placeholder="Password"
                        style={s.input}
                        secureTextEntry
                        value={form.password}
                        onChangeText={(v) => handleChange('password', v)}
                        placeholderTextColor="#94a3b8"
                    />

                    <TextInput
                        placeholder="Phone number"
                        style={s.input}
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(v) => handleChange('phone', v)}
                        placeholderTextColor="#94a3b8"
                    />

                    <TextInput
                        placeholder="Address"
                        style={s.input}
                        value={form.address}
                        onChangeText={(v) => handleChange('address', v)}
                        placeholderTextColor="#94a3b8"
                    />

                    <TouchableOpacity style={s.btn} onPress={handleRegister} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff"/>
                        ) : (
                            <Text style={s.btnText}>Create Account</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={s.link}>Already have an account? <Text style={s.linkAccent}>Sign in</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const s = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 28,
        backgroundColor: '#F9FAFB',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1F2937',
    },
    headerSubtitle: {
        color: '#6b7280',
        fontSize: 15,
        marginTop: 4,
    },
    formBox: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    inputHalf: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#F9FAFB',
        fontSize: 15,
        color: '#1F2937',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#F9FAFB',
        fontSize: 15,
        color: '#1F2937',
        marginBottom: 16,
    },
    btn: {
        backgroundColor: '#009688',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 8,
    },
    btnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 14,
        color: '#1F2937',
    },
    linkAccent: {
        color: '#00ADEF',
        fontWeight: '700',
    },
});
