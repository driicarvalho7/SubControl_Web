import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';

const subscriptions = [
  { id: 1, name: 'Netflix', price: 'R$ 55.49', due: 'Vencimento em 6 dias', period: '/mês', icon: require('../assets/icons/netflix.png'), opacity: 0.95 },
  { id: 2, name: 'Spotify', price: 'R$ 11.99', due: 'Vencimento em 9 dias', period: '/mês', icon: require('../assets/icons/spotify.png'), opacity: 0.80 },
  { id: 3, name: 'YouTube', price: 'R$ 24.99', due: 'Vencimento em 12 dias', period: '/mês', icon: require('../assets/icons/youtube.png'), opacity: 0.65 },
  { id: 4, name: 'Google', price: 'R$ 7.99', due: 'Vencimento em 3 dias', period: '/mês', icon: require('../assets/icons/google.png'), opacity: 0.50 },
  { id: 5, name: 'Disney Plus', price: 'R$ 43.90', due: 'Vencimento em 15 dias', period: '/mês', icon: require('../assets/icons/disney.png'), opacity: 0.35 }
];

function ValorTotalAssinaturas() {
  let total = 0;
  subscriptions.forEach(subscription => {
    const priceNumber = parseFloat(subscription.price.replace('R$', '').replace(',', '.').trim());
    total += priceNumber;
  });
  return (<Text style={styles.cardTitle}>R$ {total.toFixed(2)}</Text>)
}

export default function App() {
    
  const handleNavigate = () => {
      router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1121', '#03204b']} style={styles.gradient}>
        <Text style={styles.title}>Gerencie suas</Text>
        <Text style={styles.titleBlue}>Assinaturas</Text>
        <Text style={styles.subtitle}>Gerenciamento perfeito de assinaturas, simplificado para sua conveniência.</Text>
        <View style={styles.card}>
          <ValorTotalAssinaturas />
          <Text style={styles.cardSubtitle}>Valor gasto este mês</Text>
        </View>
        <View style={styles.subscriptionContainer}>
          {subscriptions.map((subscription, index) => (
            <View key={subscription.id} style={[styles.subscription, { zIndex: subscriptions.length - index, opacity: subscription.opacity, marginBottom: index < subscriptions.length - 1 ? -20 : 50 }]}>
              <Image source={subscription.icon} style={styles.icon} />
              <View style={styles.subscriptionTextContainer}>
                <Text style={styles.subscriptionTitle}>{subscription.name}</Text>
                <Text style={styles.subscriptionDetail}>{subscription.due}</Text>
              </View>
              <View style={styles.subscriptionPriceContainer}>
                <Text style={styles.subscriptionPrice}>{subscription.price}</Text>
                <Text style={styles.subscriptionPeriod}>{subscription.period}</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            {/*<Text style={styles.buttonText}>Vamos Nessa!</Text>*/}
            <Link href={'/login'} style={styles.buttonText}>Vamos Nessa!</Link>
        </TouchableOpacity>
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
      color: '#fff', 
      textAlign: 'center'
    },
    titleBlue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#0085ff', 
      textAlign: 'center'
    },
    subtitle: {
      fontSize: 16,
      color: '#fff', 
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
    subscriptionContainer: {
      marginVertical: 20,
      alignItems: 'center',
    },
    subscription: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(26, 26, 26, 0.7)',
      padding: 15,
      borderRadius: 10,
      width: '90%',
      position: 'relative',
      top: 0,
    },
    subscriptionTitle: {
      fontSize: 16,
      color: '#fff',
    },
    subscriptionPrice: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'right',
    },
    subscriptionPeriod: {
      fontSize: 12,
      color: '#aaa',
      textAlign: 'right',
    },
    subscriptionDetail: {
      fontSize: 12,
      color: '#aaa',
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    subscriptionTextContainer: {
      flex: 2,
    },
    subscriptionPriceContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    button: {
      position: 'absolute',
      bottom: 30,
      width: '85%',
      backgroundColor: '#377ded',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
});
