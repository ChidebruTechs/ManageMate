import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

export function Settings() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newRepairs: true,
    paymentReminders: true,
    systemUpdates: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'system', label: 'System', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your account, preferences, and system configuration</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Settings</span>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                    <p className="text-gray-600">Manage your personal information and account details</p>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {state.user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={state.user?.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={state.user?.email}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="flex items-center space-x-2">
                      <Badge variant="info" size="md">
                        {state.user?.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                    <p className="text-gray-600">Choose what notifications you want to receive</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'lowStock' && 'Get notified when inventory items are running low'}
                          {key === 'newRepairs' && 'Receive alerts for new repair requests'}
                          {key === 'paymentReminders' && 'Reminders for pending payments'}
                          {key === 'systemUpdates' && 'Updates about system maintenance and features'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key, !value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">Email Notifications</h3>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    All notifications will be sent to your registered email address
                  </p>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                    <p className="text-gray-600">Manage your account security and privacy</p>
                  </div>
                </div>

                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-pink-600">
                    Update Password
                  </Button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Badge variant="warning">Not Enabled</Badge>
                  </div>
                  <Button variant="secondary" className="mt-3">
                    Enable 2FA
                  </Button>
                </div>

                {/* Login Sessions */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Current Session</p>
                        <p className="text-sm text-gray-600">Chrome on Windows • Active now</p>
                      </div>
                      <Badge variant="success">Current</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
                    <p className="text-gray-600">Configure your business details and preferences</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue="ManageMate Electronics"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      placeholder="XX-XXXXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your complete business address..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Currency & Timezone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">System Configuration</h2>
                    <p className="text-gray-600">Manage system settings and data</p>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Backup & Restore</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Download className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-gray-900">Create Backup</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Download a complete backup of your data
                      </p>
                      <Button size="sm" variant="secondary">
                        Create Backup
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Upload className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium text-gray-900">Restore Data</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Restore data from a previous backup
                      </p>
                      <Button size="sm" variant="secondary">
                        Choose File
                      </Button>
                    </Card>
                  </div>
                </div>

                {/* Data Management */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Data Management</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Clear Cache</p>
                        <p className="text-sm text-gray-600">Clear temporary files and cache</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-900">Reset System</p>
                        <p className="text-sm text-red-600">Reset all settings to default</p>
                      </div>
                      <Button size="sm" variant="danger">
                        <X className="w-3 h-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                {/* System Info */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version:</span>
                        <span className="font-medium">1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">2024-02-20</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Database Size:</span>
                        <span className="font-medium">2.4 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Records:</span>
                        <span className="font-medium">1,247</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Appearance Settings</h2>
                    <p className="text-gray-600">Customize the look and feel of your application</p>
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-blue-500 rounded-lg p-4 bg-white">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded mb-3"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Light</span>
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-900">
                      <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-3"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">Dark</span>
                      </div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-gray-100 rounded mb-3"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Auto</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Scheme */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Color Scheme</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {[
                      'bg-blue-500',
                      'bg-purple-500',
                      'bg-green-500',
                      'bg-red-500',
                      'bg-yellow-500',
                      'bg-pink-500',
                      'bg-indigo-500',
                      'bg-teal-500',
                    ].map((color, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded-lg ${color} ${
                          index === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Layout Options */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Layout</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Compact Mode</p>
                        <p className="text-sm text-gray-600">Reduce spacing and padding</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Sidebar Collapsed</p>
                        <p className="text-sm text-gray-600">Start with sidebar minimized</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}