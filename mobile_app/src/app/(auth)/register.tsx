
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

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !mobile.trim()
    ) {
      Alert.alert(
        'Missing Details',
        'Please fill in all fields.'
      );
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest(
        '/api/auth/register',
        {
          name: name.trim(),
          email: email.trim(),
          password,
          role,
          mobile: mobile.trim(),
        }
      );

      Alert.alert(
        'Success',
        data.message || 'Registration successful!',
        [
          {
            text: 'Go to Login',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error) {
      console.log('Register error:', error);

      Alert.alert(
        'Registration Failed',
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
        <Text style={styles.title}>Register</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

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

        <Text style={styles.label}>Role</Text>
        <View style={styles.roleContainer}>
          <Pressable
            style={[
              styles.roleButton,
              role === 'student' && styles.selectedRole,
            ]}
            onPress={() => setRole('student')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'student' && styles.selectedRoleText,
              ]}
            >
              Student
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.roleButton,
              role === 'company' && styles.selectedRole,
            ]}
            onPress={() => setRole('company')}
          >
            <Text
              style={[
                styles.roleText,
                role === 'company' && styles.selectedRoleText,
              ]}
            >
              Company
            </Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          placeholderTextColor="#888"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        <Pressable
          style={[
            styles.registerButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registering...' : 'Register'}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => router.replace('/')}
          >
            Login
          </Text>
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
    marginVertical: 12,
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
    marginBottom: 18,
    fontSize: 16,
    color: '#222',
  },

  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  roleButton: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },

  selectedRole: {
    backgroundColor: '#4338e8',
    borderColor: '#4338e8',
  },

  roleText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '600',
  },

  selectedRoleText: {
    color: '#fff',
  },

  registerButton: {
    height: 54,
    backgroundColor: '#20bf35',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
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
    color: '#555',
  },

  link: {
    color: '#4338e8',
    fontWeight: 'bold',
  },
});
