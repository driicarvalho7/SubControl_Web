import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Item {
  label: string;
  value: string;
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

  // Modal states
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getLabelFromValue = (type: string, value: string): string => {
    let items: Item[] = [];
    switch (type) {
      case 'cycle':
        items = [
          { label: 'Diário', value: 'days' },
          { label: 'Semanal', value: 'weeks' },
          { label: 'Mensal', value: 'months' },
          { label: 'Anual', value: 'years' },
        ];
        break;
      case 'currency':
        items = [
          { label: 'Dólar ($)', value: 'usd' },
          { label: 'Real (R$)', value: 'brl' },
          { label: 'Euro (€)', value: 'eur' },
        ];
        break;
      case 'paymentMethod':
        items = [
          { label: 'PIX', value: 'pix' },
          { label: 'Cartão de Crédito', value: 'credit' },
          { label: 'Cartão de Débito', value: 'debt' },
          { label: 'Boleto Bancário', value: 'boleto' },
        ];
        break;
      case 'reminder':
        items = [
          { label: 'Nunca', value: 'never' },
          { label: '7 dias antes', value: 'week' },
          { label: 'No começo do mês', value: 'month' },
        ];
        break;
      default:
        break;
    }
    const item = items.find(item => item.value === value);
    return item ? item.label : '';
  };

  const renderModalContent = () => {
    let items: Item[] = [];
    let selectedValue = '';
    let setSelectedValue: (value: string) => void;

    switch (modalType) {
      case 'cycle':
        items = [
          { label: 'Days', value: 'days' },
          { label: 'Weeks', value: 'weeks' },
          { label: 'Months', value: 'months' },
          { label: 'Years', value: 'years' },
        ];
        selectedValue = cycle;
        setSelectedValue = setCycle;
        break;
      case 'currency':
        items = [
          { label: 'Dólar ($)', value: 'usd' },
          { label: 'Real (R$)', value: 'brl' },
          { label: 'Euro (€)', value: 'eur' },
        ];
        selectedValue = currency;
        setSelectedValue = setCurrency;
        break;
      case 'paymentMethod':
        items = [
          { label: 'PIX', value: 'pix' },
          { label: 'Cartão de Crédito', value: 'credit' },
          { label: 'Cartão de Débito', value: 'debt' },
          { label: 'Boleto Bancário', value: 'boleto' },
        ];
        selectedValue = paymentMethod;
        setSelectedValue = setPaymentMethod;
        break;
      case 'reminder':
        items = [
          { label: 'Nunca', value: 'never' },
          { label: '7 dias antes', value: 'week' },
          { label: 'No começo do mês', value: 'month' },
        ];
        selectedValue = reminder;
        setSelectedValue = setReminder;
        break;
      default:
        break;
    }

    return (
      <View style={styles.modalContent}>
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modalItem,
                item.value === selectedValue ? styles.modalItemSelected : null,
              ]}
              onPress={() => {
                setSelectedValue(item.value);
                closeModal();
              }}
            >
              <Text style={styles.modalItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

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
        <TouchableOpacity style={styles.selectionInput} onPress={() => openModal('cycle')}>
          <Text style={styles.selectionInputText}>{getLabelFromValue('cycle', cycle)}</Text>
        </TouchableOpacity>
      ),
    },
    {
      key: 'Valor',
      component: (
        <View style={styles.inputGroup}>
          <View style={styles.valueInputContainer}>
            <Text style={styles.currencyLabel}>{getLabelFromValue('currency', currency)}</Text>
            <TextInput
              style={[styles.modalInput, styles.valueInput]}
              placeholder="Valor"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>
      ),
    },
    {
      key: 'Moeda',
      component: (
        <TouchableOpacity style={styles.selectionInput} onPress={() => openModal('currency')}>
          <Text style={styles.selectionInputText}>{getLabelFromValue('currency', currency)}</Text>
        </TouchableOpacity>
      ),
    },
    {
      key: 'Método de Pagamento',
      component: (
        <TouchableOpacity style={styles.selectionInput} onPress={() => openModal('paymentMethod')}>
          <Text style={styles.selectionInputText}>{getLabelFromValue('paymentMethod', paymentMethod)}</Text>
        </TouchableOpacity>
      ),
    },
    {
      key: 'Lembre-me',
      component: (
        <TouchableOpacity style={styles.selectionInput} onPress={() => openModal('reminder')}>
          <Text style={styles.selectionInputText}>{getLabelFromValue('reminder', reminder)}</Text>
        </TouchableOpacity>
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
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {renderModalContent()}
        </View>
      </Modal>
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
  selectionInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    color: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  selectionInputText: {
    color: 'white',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemSelected: {
    backgroundColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
  },
  valueInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyLabel: {
    color: 'white',
    marginRight: 10,
  },
  valueInput: {
    flex: 1,
  },  
});
