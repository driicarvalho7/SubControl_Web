import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  
  const handleNavigate = () => {
    router.push({
      pathname: '/login'
    });
  };

  return (
    <LinearGradient colors={['#0d1121', '#03204b']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/icons/user.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Adriano Carvalho</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value="adriano.carvalho9@usp.br" editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} value="+55 (19) 98312-3425" editable={false} />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleNavigate}>
          <Text style={styles.logoutButtonText}>Logout</Text>
          <Ionicons name="exit" size={20} color="#aaa" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    marginTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#aaa',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
});

