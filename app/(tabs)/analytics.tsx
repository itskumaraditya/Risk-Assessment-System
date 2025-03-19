import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, Users, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'] as const;
type TimeRange = typeof timeRanges[number];

export default function AnalyticsScreen() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('1M');

  const riskData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 72, 84, 78, 85, 82, 80],
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const distributionData = [
    {
      name: 'High Risk',
      population: 25,
      color: '#ef4444',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Medium Risk',
      population: 45,
      color: '#eab308',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Low Risk',
      population: 30,
      color: '#22c55e',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
  ];

  const trendingProtocols = [
    { name: 'Uniswap V3', change: '+12.5%', risk: 'low' },
    { name: 'Aave V3', change: '+8.2%', risk: 'low' },
    { name: 'PancakeSwap', change: '-3.4%', risk: 'medium' },
    { name: 'Compound', change: '+5.7%', risk: 'low' },
    { name: 'dYdX', change: '-1.2%', risk: 'medium' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics Overview</Text>
        <Text style={styles.headerSubtitle}>Track protocol performance and risk metrics</Text>
      </View>

      <View style={styles.timeRangeContainer}>
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              selectedTimeRange === range && styles.timeRangeButtonActive,
            ]}
            onPress={() => setSelectedTimeRange(range)}>
            <Text
              style={[
                styles.timeRangeText,
                selectedTimeRange === range && styles.timeRangeTextActive,
              ]}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>Risk Score Trends</Text>
        </View>
        <LineChart
          data={riskData}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1a1b1e',
            backgroundGradientFrom: '#1a1b1e',
            backgroundGradientTo: '#1a1b1e',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#6366f1',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>Risk Distribution</Text>
        </View>
        <PieChart
          data={distributionData}
          width={width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Clock size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>Trending Protocols</Text>
        </View>
        <View style={styles.trendingContainer}>
          {trendingProtocols.map((protocol, index) => (
            <View key={index} style={styles.trendingItem}>
              <View>
                <Text style={styles.protocolName}>{protocol.name}</Text>
                <View style={styles.riskBadge}>
                  <Text style={styles.riskText}>{protocol.risk} risk</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.changeText,
                  { color: protocol.change.startsWith('+') ? '#22c55e' : '#ef4444' },
                ]}>
                {protocol.change}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Protocols Analyzed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>82%</Text>
          <Text style={styles.statLabel}>Accuracy Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>24h</Text>
          <Text style={styles.statLabel}>Avg Response Time</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b1e',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2d31',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#71717a',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  timeRangeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#2c2d31',
  },
  timeRangeButtonActive: {
    backgroundColor: '#6366f1',
  },
  timeRangeText: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#fff',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2d31',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  trendingContainer: {
    gap: 12,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c2d31',
    padding: 15,
    borderRadius: 12,
  },
  protocolName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 5,
  },
  riskBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  riskText: {
    color: '#71717a',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  changeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    backgroundColor: '#2c2d31',
    borderRadius: 12,
    padding: 15,
    width: '31%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#71717a',
    textAlign: 'center',
  },
});