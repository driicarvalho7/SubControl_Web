import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

interface Subscription {
  id: number;
  name: string;
  icon: any;
}

export default function AddSubscription() {
  const { customSubscription, selectedSubscription }: any = useLocalSearchParams();
  const router = useRouter();
  const isCustomSubscription = customSubscription === 'true' || customSubscription === true;
  const subscription = selectedSubscription ? JSON.parse(selectedSubscription as string) : null;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [cycle, setCycle] = useState<string>('months');
  const [value, setValue] = useState<string>('');
  const [currency, setCurrency] = useState<string>('brl');
  const [paymentMethod, setPaymentMethod] = useState<string>('pix');
  const [reminder, setReminder] = useState<string>('never');

  // Dropdown states
  const [openCycle, setOpenCycle] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [openReminder, setOpenReminder] = useState(false);

  const data = [
    { key: 'Nome', component: <TextInput style={styles.modalInput} placeholder="Nome" placeholderTextColor="#aaa" /> },
    {
      key: 'Datas',
      component: (
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Início</Text>
            {startDate ? (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, date) => setStartDate(date || startDate)}
                style={styles.datePicker}
              />
            ) : (
              <TouchableOpacity style={styles.dateNotPicker} onPress={() => setStartDate(new Date())}>
                <Text style={styles.dateNotPickerText}>Selecione a data</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fim</Text>
            {endDate ? (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, date) => setEndDate(date || endDate)}
                style={styles.datePicker}
              />
            ) : (
              <TouchableOpacity style={styles.dateNotPicker} onPress={() => setEndDate(new Date())}>
                <Text style={styles.dateNotPickerText}>Selecione a data</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ),
    },
    {
      key: 'Ciclo',
      component: (
        <DropDownPicker
          open={openCycle}
          value={cycle}
          items={[
            { label: 'Days', value: 'days' },
            { label: 'Weeks', value: 'weeks' },
            { label: 'Months', value: 'months' },
            { label: 'Years', value: 'years' },
          ]}
          setOpen={setOpenCycle}
          setValue={setCycle}
          setItems={() => {}}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={3000}
          zIndexInverse={1000}
        />
      ),
    },
    {
      key: 'Valor',
      component: (
        <TextInput
          style={styles.modalInput}
          placeholder="Valor"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
      ),
    },
    {
      key: 'Moeda',
      component: (
        <DropDownPicker
          open={openCurrency}
          value={currency}
          items={[
            { label: 'Dólar ($)', value: 'usd' },
            { label: 'Real (R$)', value: 'brl' },
            { label: 'Euro (€)', value: 'eur' },
          ]}
          setOpen={setOpenCurrency}
          setValue={setCurrency}
          setItems={() => {}}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={2500}
          zIndexInverse={1500}
        />
      ),
    },
    {
      key: 'Método de Pagamento',
      component: (
        <DropDownPicker
          open={openPaymentMethod}
          value={paymentMethod}
          items={[
            { label: 'PIX', value: 'pix' },
            { label: 'Cartão de Crédito', value: 'credit' },
            { label: 'Cartão de Débito', value: 'debt' },
            { label: 'Boleto Bancário', value: 'boleto' },
          ]}
          setOpen={setOpenPaymentMethod}
          setValue={setPaymentMethod}
          setItems={() => {}}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={2000}
          zIndexInverse={2000}
        />
      ),
    },
    {
      key: 'Lembre-me',
      component: (
        <DropDownPicker
          open={openReminder}
          value={reminder}
          items={[
            { label: 'Nunca', value: 'never' },
            { label: '7 dias antes', value: 'week' },
            { label: 'No começo do mês', value: 'month' },
          ]}
          setOpen={setOpenReminder}
          setValue={setReminder}
          setItems={() => {}}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={1500}
          zIndexInverse={2500}
        />
      ),
    },
  ];

  return (
    <LinearGradient colors={['#0d1121', '#03204b']} style={styles.gradient}>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.inputGroup}>
            {item.key != 'Datas' && <Text style={styles.label}>{item.key}</Text>}
            {item.component}
          </View>
        )}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={
          <>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>            
            <View style={styles.subscriptionItem}>
              {!isCustomSubscription && subscription ? 
                [
                  <Image source={subscription.icon} style={styles.modalIcon} />,
                  <Text style={styles.modalTitleIcon}>{subscription.name}</Text>
                ] : [
                  <Text style={styles.modalTitle}>Assinatura Personalizada</Text>
                ]
              }
            </View>            
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.modalButton} onPress={() => router.push('/home')}>
            <Text style={styles.modalButtonText}>{isCustomSubscription ? 'Salvar' : 'Adicionar Assinatura'}</Text>
          </TouchableOpacity>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  modalIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTitleIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 10,
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 80,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#aaa',
    marginBottom: 5,
  },
  modalInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
  },
  datePicker: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    color: 'white',
    justifyContent: 'center',
  },
  datePickerText: {
    color: '#aaa',
    paddingHorizontal: 10,
  },
  dateNotPicker: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    color: 'white',
    justifyContent: 'center',
  },
  dateNotPickerText: {
    color: '#f6ffff',
    paddingHorizontal: 10,
  },
  dropdown: {
    backgroundColor: '#2a2a2a',
    borderColor: '#2a2a2a',
  },
  dropdownText: {
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: '#2a2a2a',
  },
  modalButton: {
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
