
import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Platform, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView, ThemedText } from '../../components/common/ThemedView';
import { ThemedInput, ThemedButton } from '../../components/common/ThemedComponents';
import { useTheme } from '../../theme/ThemeContext';

// Mock user data
const USER_DATA = {
  firstName: 'Fatou',
  lastName: 'Sow',
  email: 'fatou.sow@example.com',
  phone: '+237 698 54 43 42',
  country: 'Cameroon',
  city: 'Douala',
  dob: '1990-05-15',
  profileImage: null // URL would go here
};

export const PersonalInfo = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const [userData, setUserData] = useState(USER_DATA);
  const [editing, setEditing] = useState(false);
  
  // Handle form edits
  const handleChange = (field: keyof typeof USER_DATA, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    // Here we would normally make an API call to update the user profile
    Alert.alert(
      "Success",
      "Your profile has been updated successfully!",
      [{ text: "OK", onPress: () => setEditing(false) }]
    );
  };

  // Handle picking a profile picture
  const handlePickImage = () => {
    // In a real app, this would open the image picker
    Alert.alert(
      "Feature Coming Soon",
      "Profile picture upload will be available in the next update!",
      [{ text: "OK" }]
    );
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={isDarkMode ? colors.light.text : colors.dark.text} 
            />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Personal Information</ThemedText>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(!editing)}
          >
            <Ionicons 
              name={editing ? "close" : "create-outline"} 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handlePickImage}
            disabled={!editing}
          >
            {userData.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }}
                style={styles.profileImage} 
              />
            ) : (
              <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.primary }]}>
                <ThemedText style={styles.profileInitials}>
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </ThemedText>
              </View>
            )}
            {editing && (
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </View>
            )}
          </TouchableOpacity>
          
          <ThemedText style={styles.userName}>
            {userData.firstName} {userData.lastName}
          </ThemedText>
          <ThemedText secondary style={styles.userEmail}>
            {userData.email}
          </ThemedText>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <ThemedInput
            label="First Name"
            value={userData.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
            containerStyle={styles.inputContainer}
            editable={editing}
          />
          
          <ThemedInput
            label="Last Name"
            value={userData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
            containerStyle={styles.inputContainer}
            editable={editing}
          />
          
          <ThemedInput
            label="Email"
            value={userData.email}
            onChangeText={(text) => handleChange('email', text)}
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
            editable={editing}
          />
          
          <ThemedInput
            label="Phone Number"
            value={userData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
            editable={editing}
          />
          
          <ThemedInput
            label="Country"
            value={userData.country}
            onChangeText={(text) => handleChange('country', text)}
            containerStyle={styles.inputContainer}
            editable={editing}
          />
          
          <ThemedInput
            label="City"
            value={userData.city}
            onChangeText={(text) => handleChange('city', text)}
            containerStyle={styles.inputContainer}
            editable={editing}
          />
          
          <ThemedInput
            label="Date of Birth"
            value={userData.dob}
            onChangeText={(text) => handleChange('dob', text)}
            containerStyle={styles.inputContainer}
            editable={editing}
          />

          {editing && (
            <ThemedButton
              title="Save Changes"
              onPress={handleSaveProfile}
              containerStyle={styles.saveButton}
            />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#3B5BFE',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 24,
  },
  formSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 12,
  },
});
