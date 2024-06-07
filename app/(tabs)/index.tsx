import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0d1121', '#03204b']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Gerencie suas</Text>
        <Text style={styles.titleBlue}>Assinaturas</Text>
        <Text style={styles.subtitle}>Gerenciamento perfeito de assinaturas, simplificado para sua conveniência.</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>R$ 275,89</Text>
          <Text style={styles.cardSubtitle}>Valor gasto este mês</Text>
        </View>
        <View style={styles.subscription}>
          <Text style={styles.subscriptionTitle}>Netflix</Text>
          <Text style={styles.subscriptionPrice}>R$ 55.44</Text>
          <Text style={styles.subscriptionDetail}>Vencimento em 6 dias</Text>
        </View>
        <View style={styles.subscription}>
          <Text style={styles.subscriptionTitle}>Spotify</Text>
          <Text style={styles.subscriptionPrice}>R$ 14.99</Text>
          <Text style={styles.subscriptionDetail}>Vencimento em 9 dias</Text>
        </View>
        <Button title="Vamos Nessa!" onPress={() => navigation.navigate('MainTabs')} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // ajuste a cor do texto conforme necessário
    textAlign: 'center'
  },
  titleBlue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0085ff', // ajuste a cor do texto conforme necessário
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#fff', // ajuste a cor do texto conforme necessário
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  cardTitle: {
    fontSize: 24,
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#aaa',
  },
  subscription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
  },
  subscriptionTitle: {
    fontSize: 16,
    color: '#fff',
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#fff',
  },
  subscriptionDetail: {
    fontSize: 12,
    color: '#aaa',
  },
});
