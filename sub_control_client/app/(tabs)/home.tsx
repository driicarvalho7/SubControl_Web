import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const subscriptions = [
  { id: 1, name: 'Netflix', price: 'R$ 55,49', due: 'Vencimento em 2 dias', period: '/mês', icon: require('../../assets/icons/netflix.png'), cardLastDigits: '1234', cardBrand: 'Visa' },
  { id: 2, name: 'Spotify', price: 'R$ 11,99', due: 'Vencimento em 6 dias', period: '/mês', icon: require('../../assets/icons/spotify.png'), cardLastDigits: '5678', cardBrand: 'Mastercard' },
  { id: 3, name: 'Disney +', price: 'R$ 43,90', due: 'Vencimento em 16 dias', period: '/mês', icon: require('../../assets/icons/disney.png'), cardLastDigits: '1234', cardBrand: 'Visa' },
];

const totalGasto = useMemo(() => {
  return subscriptions.reduce((total, subscription) => {
    const priceNumber = parseFloat(subscription.price.replace('R$', '').replace(',', '.').trim());
    return total + priceNumber;
  }, 0);
}, [subscriptions]);

const groupedExpenses = useMemo(() => {
  const expenses = subscriptions.reduce((acc, subscription) => {
    const key = `${subscription.cardBrand} **** ${subscription.cardLastDigits}`;
    if (!acc[key]) {
      acc[key] = { total: 0, brand: subscription.cardBrand };
    }
    acc[key].total += parseFloat(subscription.price.replace('R$', '').replace(',', '.').trim());
    return acc;
  }, {});
  return Object.keys(expenses).map(key => ({
    card: key,
    brand: expenses[key].brand,
    total: expenses[key].total.toFixed(2),
  }));
}, [subscriptions]);

const { height: windowHeight } = Dimensions.get('window');

function CardIcons(cardBrand: string) {
  switch (cardBrand) {
    case 'Visa':
      return require('../../assets/icons/visa.png');
    case 'Mastercard':
      return require('../../assets/icons/mastercard.png');
    default:
      return null;
  }
}

export default function Home() {
  return (
    <LinearGradient colors={['#0d1121', '#03204b']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../../assets/icons/user.png')} style={styles.userImage} />
          <Text style={styles.greeting}>Olá, Adriano</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>R$ {totalGasto.toFixed(2)}</Text>
          <Text style={styles.totalSubtitle}>Total gasto este mês de junho</Text>
        </View>
        <View style={styles.upcomingPayments}>
          <Text style={styles.sectionTitle}>Próximos pagamentos</Text>
          <View style={styles.paymentCardsContainer}>
            {subscriptions.slice(0, 2).map(subscription => (
              <View key={subscription.id} style={styles.paymentCard}>
                <Image source={subscription.icon} style={styles.paymentIcon} />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{subscription.name}</Text>
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentPrice}>{subscription.price}</Text>
                  <Text style={styles.paymentPeriod}>{subscription.period}</Text>
                </View>
                <Text style={styles.paymentDue}>{subscription.due}</Text>
                <Text style={styles.paymentDue}>Cartão: **** {subscription.cardLastDigits}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.groupedExpenses}>
          <Text style={styles.sectionTitle}>Gastos por cartão</Text>
          {groupedExpensesArray.map((expense, index) => (
            <View key={index} style={styles.subscriptionCard}>
              <Image source={CardIcons(expense.brand)} style={styles.cardBrandIcon} />
              <View style={styles.subscriptionInfo}>
                <Text style={styles.expenseCardText}>{expense.card}</Text>
              </View>
              <View style={styles.subscriptionPriceContainer}>
                <Text style={styles.expenseCardText}>R$ {expense.total}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.subscriptions}>
          <Text style={styles.sectionTitle}>Minhas assinaturas</Text>
          {subscriptions.map(subscription => (
            <View key={subscription.id} style={styles.subscriptionCard}>
              <Image source={subscription.icon} style={styles.subscriptionIcon} />
              <View style={styles.subscriptionInfo}>
                <Text style={styles.subscriptionName}>{subscription.name}</Text>
                <Text style={styles.subscriptionDue}>{subscription.due}</Text>
                <Text style={styles.cardInfo}>Cartão: {subscription.cardBrand} **** {subscription.cardLastDigits}</Text>
              </View>
              <View style={styles.subscriptionPriceContainer}>
                <Text style={styles.subscriptionPrice}>{subscription.price}</Text>
                <Text style={styles.subscriptionPeriod}>{subscription.period}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    minHeight: windowHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
  },
  totalContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  totalSubtitle: {
    fontSize: 16,
    color: '#aaa',
  },
  cardBrandIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  upcomingPayments: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  paymentCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
  paymentInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  paymentDue: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  paymentPrice: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  paymentPeriod: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  groupedExpenses: {
    marginVertical: 20,
  },
  expenseCardText: {
    fontSize: 16,
    color: '#fff',
  },
  subscriptions: {
    marginVertical: 20,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  subscriptionIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    color: '#fff',
  },
  subscriptionDue: {
    fontSize: 12,
    color: '#aaa',
  },
  cardInfo: {
    fontSize: 12,
    color: '#aaa',
  },
  subscriptionPriceContainer: {
    alignItems: 'flex-end',
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#fff',
  },
  subscriptionPeriod: {
    fontSize: 12,
    color: '#aaa',
  },
});
