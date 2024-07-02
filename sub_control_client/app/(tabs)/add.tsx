import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const subscriptions = [
  { id: 1, name: 'Netflix', icon: require('../../assets/icons/netflix.png') },
  { id: 2, name: 'Disney +', icon: require('../../assets/icons/disney.png') },
  { id: 3, name: 'Spotify', icon: require('../../assets/icons/spotify.png') },
  { id: 4, name: 'Chat GPT Plus', icon: require('../../assets/icons/chatgpt.png') },
  { id: 5, name: 'YouTube Prime', icon: require('../../assets/icons/youtube.png') },
  { id: 6, name: 'Amazon Prime', icon: require('../../assets/icons/prime.png') },
  { id: 7, name: 'Twitch Subscription', icon: require('../../assets/icons/twitch.png') },
  { id: 8, name: 'Discord Nitro', icon: require('../../assets/icons/discord.png') },
  { id: 9, name: 'Microsoft365', icon: require('../../assets/icons/microsoft365.png') },
  { id: 10, name: 'Adobe', icon: require('../../assets/icons/adobe.png') },
  { id: 11, name: 'iCloud', icon: require('../../assets/icons/icloud.png') },
  { id: 12, name: 'Deezer', icon: require('../../assets/icons/deezer.png') },
  { id: 13, name: 'Vivo', icon: require('../../assets/icons/vivo.png') },
  { id: 14, name: 'Claro', icon: require('../../assets/icons/claro.png') },
];

export default function AddSubscriptionScreen() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState(subscriptions);
  const router = useRouter();

  const handleChangeSearch = (text: any) => {
    setSearchText(text);

    const filtered = subscriptions.filter(subscription =>
      subscription.name.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredSubscriptions(filtered);
  }
  
  const handleClickAdd = (custom: boolean, sub_id: number) => {
    if (custom) {
      router.push({
        pathname: '/add-subscription',
        params: { customSubscription: 'true' },
      });
    } else {
      const subscription = subscriptions.find(sub => sub.id === sub_id);
      router.push({
        pathname: '/add-subscription',
        params: { customSubscription: 'false', selectedSubscription: JSON.stringify(subscription) },
      });
    }
  }

  return (
    <LinearGradient colors={['#0d1121', '#03204b']} style={styles.gradient}>
      <View style={styles.header}>
        <View style={styles.container}>
          <Text style={styles.title}>Todas assinaturas</Text>
          <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={handleChangeSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
          </View>
          <TouchableOpacity style={styles.customSubscriptionButton} onPress={() => handleClickAdd(true, 0)}>
            <Text style={styles.customSubscriptionText}>Assinatura personalizada</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.subscriptionItem}>
            <Image source={item.icon} style={styles.subscriptionIcon} />
            <Text style={styles.subscriptionName}>{item.name}</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => handleClickAdd(false, item.id)}
            >
              <Ionicons name="add-circle-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    borderRadius: 5,
    marginBottom: 20,
  },
  searchContainerFocused: {
    borderColor: '#1e90ff',
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  customSubscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  customSubscriptionText: {
    color: 'white',
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    padding: 10,
    height: 80,
    borderRadius: 10,
    margin: 10
  },
  subscriptionIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  subscriptionName: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  addButton: {
    padding: 10,
  },
});
