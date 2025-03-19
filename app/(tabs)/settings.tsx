import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Bell, Shield, Lock, Eye, ChevronRight, Wallet, User, CircleHelp as HelpCircle, Settings as SettingsIcon, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const SettingItem = ({ icon, title, subtitle, value, onPress, toggle, danger }) => (
    <TouchableOpacity
      style={[styles.settingItem, danger && styles.settingItemDanger]}
      onPress={onPress}
      disabled={toggle}>
      <View style={styles.settingLeft}>
        {icon}
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, danger && styles.settingTitleDanger]}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {toggle ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#2c2d31', true: '#6366f1' }}
          thumbColor={value ? '#fff' : '#71717a'}
        />
      ) : (
        <ChevronRight size={20} color={danger ? '#ef4444' : '#71717a'} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={32} color="#6366f1" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          icon={<Bell size={20} color="#6366f1" />}
          title="Push Notifications"
          subtitle="Get alerts for important protocol updates"
          value={notifications}
          onPress={() => setNotifications(!notifications)}
          toggle={true}
        />
        <SettingItem
          icon={<Shield size={20} color="#6366f1" />}
          title="Auto Risk Scan"
          subtitle="Automatically scan new protocols"
          value={autoScan}
          onPress={() => setAutoScan(!autoScan)}
          toggle={true}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <SettingItem
          icon={<Lock size={20} color="#6366f1" />}
          title="Biometric Authentication"
          subtitle="Use Face ID or fingerprint to unlock"
          value={biometrics}
          onPress={() => setBiometrics(!biometrics)}
          toggle={true}
        />
        <SettingItem
          icon={<Eye size={20} color="#6366f1" />}
          title="Private Mode"
          subtitle="Hide sensitive information"
          value={privateMode}
          onPress={() => setPrivateMode(!privateMode)}
          toggle={true}
        />
        <SettingItem
          icon={<Wallet size={20} color="#6366f1" />}
          title="Connected Wallets"
          subtitle="Manage your connected wallets"
          onPress={() => {}}
          toggle={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingItem
          icon={<SettingsIcon size={20} color="#6366f1" />}
          title="Dark Mode"
          value={darkMode}
          onPress={() => setDarkMode(!darkMode)}
          toggle={true}
        />
        <SettingItem
          icon={<HelpCircle size={20} color="#6366f1" />}
          title="Help & Support"
          subtitle="Get help with using the app"
          onPress={() => {}}
          toggle={false}
        />
      </View>

      <View style={styles.section}>
        <SettingItem
          icon={<LogOut size={20} color="#ef4444" />}
          title="Sign Out"
          onPress={() => {}}
          toggle={false}
          danger={true}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c2d31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2c2d31',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2d31',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#71717a',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  settingItemDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#fff',
  },
  settingTitleDanger: {
    color: '#ef4444',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    color: '#71717a',
    fontSize: 14,
    marginBottom: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    color: '#6366f1',
    fontSize: 14,
  },
  footerDot: {
    color: '#71717a',
    marginHorizontal: 8,
  },
});