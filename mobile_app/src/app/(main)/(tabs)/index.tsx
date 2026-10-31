
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { apiGet } from '../../../services/api';

type Internship = {
  _id?: string;
  id?: string;
  title?: string;
  company?: string | { name?: string };
  location?: string;
  duration?: string;
  type?: string;
  badge?: string;
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Backend එකෙන් internships ලබාගැනීම
  useEffect(() => {
    const loadInternships = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await apiGet('/api/internships');

        // Backend එකෙන් එන response format එක අනුව list එක තෝරාගැනීම
        const list: Internship[] = Array.isArray(data)
          ? data
          : Array.isArray(data.internships)
            ? data.internships
            : Array.isArray(data.data)
              ? data.data
              : [];

        setInternships(list);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load internships'
        );
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, []);

  // Search functionality
  const filteredInternships = internships.filter((item) => {
    const companyName =
      typeof item.company === 'string'
        ? item.company
        : item.company?.name ?? '';

    return `${item.title ?? ''} ${companyName} ${item.location ?? ''}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🎓 University Internship</Text>
        <Text style={styles.headerTitle}>System</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Heading */}
        <Text style={styles.title}>Available Internships</Text>

        <Text style={styles.subtitle}>
          Explore verified placements and seasonal
          opportunities.
        </Text>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search internships"
            placeholderTextColor="#9299A8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#205CF5"
            />

            <Text style={styles.loadingText}>
              Loading internships...
            </Text>
          </View>
        )}

        {/* Error */}
        {!!error && !loading && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>
              {error}
            </Text>

            <Pressable
              style={styles.retryButton}
              onPress={() => {
                setLoading(true);
                setError('');

                apiGet('/api/internships')
                  .then((data) => {
                    const list: Internship[] = Array.isArray(data)
                      ? data
                      : Array.isArray(data.internships)
                        ? data.internships
                        : Array.isArray(data.data)
                          ? data.data
                          : [];

                    setInternships(list);
                  })
                  .catch((err) => {
                    setError(
                      err instanceof Error
                        ? err.message
                        : 'Failed to load internships'
                    );
                  })
                  .finally(() => setLoading(false));
              }}
            >
              <Text style={styles.buttonText}>
                Try Again
              </Text>
            </Pressable>
          </View>
        )}

        {/* Internship Cards */}
        {!loading &&
          !error &&
          filteredInternships.map((item, index) => {
            const companyName =
              typeof item.company === 'string'
                ? item.company
                : item.company?.name ?? 'Company';

            return (
              <View
                key={item._id ?? item.id ?? index}
                style={styles.card}
              >
                <View style={styles.cardTop}>
                  <View style={styles.iconBox}>
                    <Text style={styles.cardIcon}>▣</Text>
                  </View>

                  <View style={styles.cardHeading}>
                    <Text style={styles.cardTitle}>
                      {item.title ?? 'Untitled Internship'}
                    </Text>

                    <Text style={styles.company}>
                      ◉ Company: {companyName}
                    </Text>

                    <Text style={styles.detail}>
                      ⌖ Location:{' '}
                      {item.location ?? 'Not specified'}
                    </Text>

                    <Text style={styles.detail}>
                      ◷ {item.duration ?? 'Duration not specified'}
                      {' · '}
                      {item.type ?? 'Type not specified'}
                    </Text>
                  </View>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {item.badge ?? 'Internship'}
                    </Text>
                  </View>
                </View>

               <Pressable
  style={styles.detailsButton}
  onPress={() => {
    const id = item._id ?? item.id;

    if (id) {
      router.push({
        pathname: '/(main)/details',
        params: { id },
      });
    }
  }}
>
  <Text style={styles.buttonText}>
    View Details →
  </Text>
</Pressable>
              </View>
            );
          })}

        {/* No Results */}
        {!loading &&
          !error &&
          filteredInternships.length === 0 && (
            <Text style={styles.emptyText}>
              {internships.length === 0
                ? 'No internships available.'
                : 'No internships found.'}
            </Text>
          )}

        {/* Footer */}
        <Text style={styles.footer}>
          © 2026 University Internship Management System
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5FA',
  },

  header: {
    backgroundColor: '#205CF5',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 27,
  },

  content: {
    padding: 18,
    paddingBottom: 30,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#18233D',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#737D91',
    lineHeight: 21,
    marginBottom: 20,
  },

  searchBox: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E5EF',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 24,
    color: '#7C879B',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#18233D',
  },

  loadingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },

  loadingText: {
    marginTop: 10,
    color: '#737D91',
    fontSize: 14,
  },

  messageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: '#205CF5',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 9,
    backgroundColor: '#EDF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  cardIcon: {
    color: '#205CF5',
    fontSize: 20,
  },

  cardHeading: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A40',
    marginBottom: 8,
  },

  company: {
    fontSize: 11,
    color: '#566176',
    marginBottom: 5,
  },

  detail: {
    fontSize: 11,
    color: '#566176',
    marginBottom: 5,
  },

  badge: {
    backgroundColor: '#D9FBE7',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 5,
  },

  badgeText: {
    fontSize: 9,
    color: '#087B43',
    fontWeight: 'bold',
  },

  detailsButton: {
    backgroundColor: '#205CF5',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    color: '#737D91',
    marginTop: 30,
  },

  footer: {
    color: '#9299A8',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 22,
  },
});
