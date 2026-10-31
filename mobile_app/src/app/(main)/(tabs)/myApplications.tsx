
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { apiGetProtected } from '../../../services/api';

type Application = {
  _id: string;
  status?: string;
  internship?: {
    _id?: string;
    title?: string;
    company?: string | { name?: string };
    location?: string;
    duration?: string;
  } | null;
};

export default function MyApplicationsScreen() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadApplications = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');

      const data = await apiGetProtected('/api/applications/my');

      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load applications'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const getCompanyName = (
    company?: string | { name?: string }
  ) => {
    if (typeof company === 'string') return company;
    return company?.name || 'Company';
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'selected':
        return '#15803D';
      case 'rejected':
        return '#DC2626';
      default:
        return '#D97706';
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.infoText}>Loading applications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Applications</Text>
      <Text style={styles.subtitle}>
        Track the status of your internship applications.
      </Text>

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>

          <Pressable
            style={styles.retryButton}
            onPress={() => loadApplications()}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadApplications(true)}
            />
          }
          contentContainerStyle={
            applications.length === 0 ? styles.emptyList : styles.list
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyTitle}>
                No Applications Yet
              </Text>
              <Text style={styles.infoText}>
                Apply for an internship to see it here.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const internship = item.internship;
            const status = item.status || 'pending';

            return (
              <View style={styles.card}>
                <Text style={styles.internshipTitle}>
                  {internship?.title || 'Internship'}
                </Text>

                <Text style={styles.company}>
                  {getCompanyName(internship?.company)}
                </Text>

                <Text style={styles.detail}>
                  Location: {internship?.location || 'Not specified'}
                </Text>

                <Text style={styles.detail}>
                  Duration: {internship?.duration || 'Not specified'}
                </Text>

                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Status</Text>
                  <Text
                    style={[
                      styles.status,
                      { color: getStatusColor(status) },
                    ]}
                  >
                    {status.toUpperCase()}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
    paddingTop: 55,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 22,
  },
  list: {
    paddingBottom: 25,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  internshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  company: {
    fontSize: 15,
    color: '#2563EB',
    marginTop: 6,
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 7,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 10,
    paddingTop: 13,
  },
  statusLabel: {
    color: '#475569',
    fontWeight: '600',
  },
  status: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    color: '#64748B',
    marginTop: 10,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
