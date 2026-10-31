
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { apiRequest } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing Details',
        'Please enter your email and password.'
      );
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest('/api/auth/login', {
        email: email.trim(),
        password,
      });

      if (!data.token) {
        Alert.alert(
          'Login Error',
          'Backend response does not contain a token.'
        );
        return;
      }

      await SecureStore.setItemAsync('token', data.token);

     router.replace('/(main)');
  
    } catch (error) {
      console.log('Login error:', error);

      Alert.alert(
        'Login Failed',
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          style={[
            styles.loginButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          If you don't have an account, please{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/register')}
          >
            Register
          </Text>
          {' '}first.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#202020',
    justifyContent: 'center',
    padding: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    fontSize: 16,
    color: '#222',
  },

  loginButton: {
    height: 54,
    backgroundColor: '#4338e8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    marginTop: 22,
    lineHeight: 22,
    color: '#555',
  },

  link: {
    color: '#4338e8',
    fontWeight: 'bold',
  },
});
