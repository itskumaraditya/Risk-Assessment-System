import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Shielimport { Shield, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Search, ArrowRight, Loader as Loader2 } from 'lucide-react-native'} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskAssessment {
  score: number;
  level: RiskLevel;
  findings: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'critical' | 'warning' | 'info';
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  metrics: {
    tvl: string;
    holders: number;
    transactions: number;
    age: string;
  };
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function RiskAssessmentScreen() {
  const [protocol, setProtocol] = useState('');
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [activeTab, setActiveTab] = useState<'findings' | 'recommendations'>('findings');

  const searchBarWidth = useSharedValue(width - 40);
  const buttonScale = useSharedValue(1);
  const resultOpacity = useSharedValue(0);

  const analyzeProtocol = useCallback(async () => {
    setLoading(true);
    searchBarWidth.value = withSpring(width - 40);
    buttonScale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );

    // Simulated API call to AI risk assessment service
    setTimeout(() => {
      setAssessment({
        score: 85,
        level: 'medium',
        findings: [
          {
            id: '1',
            title: 'Smart Contract Audit Status',
            description: 'The protocol has not undergone a complete security audit by a reputable firm.',
            severity: 'critical'
          },
          {
            id: '2',
            title: 'Token Economics',
            description: 'Complex tokenomics with potential inflation risks and unclear vesting schedules.',
            severity: 'warning'
          },
          {
            id: '3',
            title: 'Governance Structure',
            description: 'Decentralized governance implementation needs review for potential centralization risks.',
            severity: 'info'
          }
        ],
        recommendations: [
          {
            id: '1',
            title: 'Wait for Audit Completion',
            description: 'Hold off on large investments until a complete security audit is performed and published.'
          },
          {
            id: '2',
            title: 'Review Documentation',
            description: 'Thoroughly examine the whitepaper, focusing on tokenomics and vesting schedules.'
          },
          {
            id: '3',
            title: 'Start Small',
            description: 'Begin with minimal test transactions to understand protocol behavior.'
          }
        ],
        metrics: {
          tvl: '$5.2M',
          holders: 12500,
          transactions: 45000,
          age: '6 months'
        }
      });
      setLoading(false);
      resultOpacity.value = withSpring(1);
    }, 2000);
  }, []);

  const searchBarStyle = useAnimatedStyle(() => ({
    width: searchBarWidth.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const resultStyle = useAnimatedStyle(() => ({
    opacity: resultOpacity.value,
  }));

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return '#22c55e';
      case 'medium':
        return '#eab308';
      case 'high':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  const getSeverityColor = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return '#ef4444';
      case 'warning':
        return '#eab308';
      case 'info':
        return '#3b82f6';
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Shield size={48} color="#6366f1" />
        <Text style={styles.title}>Protocol Risk Assessment</Text>
        <Text style={styles.subtitle}>
          AI-powered analysis of protocol security and risks
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Animated.View style={[styles.inputWrapper, searchBarStyle]}>
          <Search size={20} color="#71717a" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter protocol address or name"
            placeholderTextColor="#71717a"
            value={protocol}
            onChangeText={setProtocol}
          />
        </Animated.View>
        <AnimatedTouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled, buttonStyle]}
          onPress={analyzeProtocol}
          disabled={loading || !protocol}>
          {loading ? (
            <Loader2 size={24} color="#fff" style={styles.loadingIcon} />
          ) : (
            <>
              <Text style={styles.buttonText}>Analyze</Text>
              <ArrowRight size={20} color="#fff" />
            </>
          )}
        </AnimatedTouchableOpacity>
      </View>

      {assessment && (
        <Animated.View style={[styles.resultContainer, resultStyle]}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>Risk Score</Text>
            <View style={styles.scoreCircle}>
              <Text
                style={[
                  styles.score,
                  { color: getRiskColor(assessment.level) },
                ]}>
                {assessment.score}
              </Text>
              <Text
                style={[
                  styles.riskLevel,
                  { color: getRiskColor(assessment.level) },
                ]}>
                {assessment.level.toUpperCase()} RISK
              </Text>
            </View>
          </View>

          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{assessment.metrics.tvl}</Text>
              <Text style={styles.metricLabel}>TVL</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{assessment.metrics.holders.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Holders</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{assessment.metrics.transactions.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Transactions</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{assessment.metrics.age}</Text>
              <Text style={styles.metricLabel}>Age</Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'findings' && styles.activeTab]}
              onPress={() => setActiveTab('findings')}>
              <AlertTriangle size={20} color={activeTab === 'findings' ? '#6366f1' : '#71717a'} />
              <Text style={[styles.tabText, activeTab === 'findings' && styles.activeTabText]}>
                Findings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'recommendations' && styles.activeTab]}
              onPress={() => setActiveTab('recommendations')}>
              <CheckCircle size={20} color={activeTab === 'recommendations' ? '#6366f1' : '#71717a'} />
              <Text style={[styles.tabText, activeTab === 'recommendations' && styles.activeTabText]}>
                Recommendations
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'findings' ? (
            <View style={styles.contentContainer}>
              {assessment.findings.map((finding) => (
                <View key={finding.id} style={styles.findingCard}>
                  <View style={styles.findingHeader}>
                    <View
                      style={[
                        styles.severityIndicator,
                        { backgroundColor: getSeverityColor(finding.severity) },
                      ]}
                    />
                    <Text style={styles.findingTitle}>{finding.title}</Text>
                  </View>
                  <Text style={styles.findingDescription}>{finding.description}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.contentContainer}>
              {assessment.recommendations.map((rec) => (
                <View key={rec.id} style={styles.recommendationCard}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <Text style={styles.recommendationDescription}>{rec.description}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    height: 200,
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#71717a',
    marginTop: 5,
    textAlign: 'center',
  },
  searchContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: Platform.OS === 'web' ? 8 : 0,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIcon: {
    ...Platform.select({
      web: {
        animation: 'spin 1s linear infinite',
      },
    }),
  },
  resultContainer: {
    padding: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2c2d31',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  scoreTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  metricItem: {
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#71717a',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#1a1b1e',
  },
  tabText: {
    color: '#71717a',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6366f1',
  },
  contentContainer: {
    gap: 15,
  },
  findingCard: {
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 15,
  },
  findingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  severityIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  findingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  findingDescription: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 15,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
});