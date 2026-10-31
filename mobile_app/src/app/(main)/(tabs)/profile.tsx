import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  apiGetProtected,
  apiPutProtected,
} from '../../../services/api';

export default function ProfileScreen() {
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile details from backend
  const loadProfile = async () => {
    try {
      setLoading(true);

      const data = await apiGetProtected('/api/auth/profile');

      const user = data.user ?? data;

      setStudent(user);
      setName(user.name || '');
      setEmail(user.email || '');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'Failed to load profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Update profile in backend
  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert(
        'Validation Error',
        'Name and email are required.'
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    try {
      setSaving(true);

      const updated = await apiPutProtected(
        '/api/auth/update',
        {
          name: name.trim(),
          email: email.trim(),
        }
      );

      const user = updated.user ?? updated;

      setStudent(user);
      setName(user.name || '');
      setEmail(user.email || '');

      setEditing(false);

      Alert.alert(
        'Success',
        'Profile updated successfully.'
      );
    } catch (error) {
      Alert.alert(
        'Update Failed',
        error instanceof Error
          ? error.message
          : 'Could not update profile.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing and restore original details
  const handleCancel = () => {
    setName(student?.name || '');
    setEmail(student?.email || '');
    setEditing(false);
  };

  // Logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync('token');

            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          View and manage your student details
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(student?.name || 'S')
              .trim()
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        {!editing ? (
          <>
            <Text style={styles.studentName}>
              {student?.name || 'Student'}
            </Text>

            <Text style={styles.studentEmail}>
              {student?.email || 'No email available'}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>
              {student?.name || 'Not available'}
            </Text>

            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>
              {student?.email || 'Not available'}
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.primaryButtonText}>
                Edit Profile
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              Edit Your Details
            </Text>

            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              editable={!saving}
            />

            <Text style={styles.label}>Email Address</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!saving}
            />

            <Pressable
              style={[
                styles.primaryButton,
                saving && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Save Changes
                </Text>
              )}
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={handleCancel}
              disabled={saving}
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </Pressable>
          </>
        )}
      </View>

      {!editing && (
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  content: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },

  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 15,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 3,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  studentName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },

  studentEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E2E8F0',
    marginVertical: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
  },

  value: {
    alignSelf: 'flex-start',
    width: '100%',
    fontSize: 16,
    color: '#0F172A',
    marginTop: 6,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  disabledButton: {
    opacity: 0.6,
  },

  cancelButton: {
    width: '100%',
    padding: 13,
    alignItems: 'center',
    marginTop: 5,
  },

  cancelButtonText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 15,
  },

  logoutButton: {
    width: '100%',
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  logoutButtonText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
