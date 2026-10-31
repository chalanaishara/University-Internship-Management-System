
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { apiGet, apiPostProtected } from '../../services/api';

type Internship = {
  _id?: string;
  title?: string;
  company?: string | { name?: string };
  location?: string;
  duration?: string;
  type?: string;
  description?: string;
  requirements?: string | string[];
  salary?: string | number;
};

export default function InternshipDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [applying, setApplying] = useState(false);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetails = async () => {
      if (!id || Array.isArray(id)) {
        setError('Invalid internship ID');
        setLoading(false);
        return;
      }

      try {
        const data = await apiGet(`/api/internships/${id}`);
        setInternship(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load internship details'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  const handleApply = async () => {
  if (!id || Array.isArray(id)) {
    Alert.alert('Error', 'Invalid internship ID');
    return;
  }

  try {
    setApplying(true);

    const result = await apiPostProtected(
      `/api/applications/${id}`
    );

    Alert.alert(
      'Success',
      result.message || 'Application submitted successfully!'
    );
  } catch (err) {
    Alert.alert(
      'Application Failed',
      err instanceof Error
        ? err.message
        : 'Failed to submit application'
    );
  } finally {
    setApplying(false);
  }
};

  const companyName =
    typeof internship?.company === 'string'
      ? internship.company
      : internship?.company?.name ?? 'Not specified';

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#205CF5" />
        <Text style={styles.message}>Loading details...</Text>
      </View>
    );
  }

  if (error || !internship) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error || 'Internship not found'}
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Internship Details
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>▣</Text>
          </View>

          <Text style={styles.title}>
            {internship.title ?? 'Internship'}
          </Text>

          <Text style={styles.company}>
            Company: {companyName}
          </Text>

          <Text style={styles.detail}>
            Location: {internship.location ?? 'Not specified'}
          </Text>

          <Text style={styles.detail}>
            Duration: {internship.duration ?? 'Not specified'}
          </Text>

          <Text style={styles.detail}>
            Type: {internship.type ?? 'Not specified'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            {internship.description ?? 'No description available.'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.body}>
            {Array.isArray(internship.requirements)
              ? internship.requirements.join('\n')
              : internship.requirements ?? 'No requirements specified.'}
          </Text>
        </View>
      </ScrollView>

      
<Pressable
  style={[
    styles.applyButton,
    applying && { opacity: 0.6 },
  ]}
  onPress={handleApply}
  disabled={applying}
>
  <Text style={styles.buttonText}>
    {applying ? 'Applying...' : 'Apply Now'}
  </Text>
</Pressable>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F3F5FA',
  },
  message: {
    marginTop: 12,
    color: '#737D91',
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  header: {
    backgroundColor: '#205CF5',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  content: {
    padding: 18,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 13,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#EDF2FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  icon: {
    color: '#205CF5',
    fontSize: 26,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#18233D',
    marginBottom: 12,
  },
  company: {
    fontSize: 15,
    color: '#205CF5',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#566176',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18233D',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#566176',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#205CF5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  applyButton: {
  backgroundColor: '#205CF5',
  height: 48,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 50,
},

});
