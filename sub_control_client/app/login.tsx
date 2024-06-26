import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import loginService from '../services/login/loginService';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertSuccessful, setAlertSuccessful] = useState(false);
  const alertOpacity = useState(new Animated.Value(0))[0];

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(alertOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setAlertVisible(false);
        });
      }, 3000);
    });
  };

  const handleLogin = async () => {
    try {
      const response = await loginService.login({email, password: senha});
      const result = response.data;

      if (response.status == 200) {
        setAlertSuccessful(true);
        showAlert('Logado com Sucesso!');
      } else {
        setAlertSuccessful(false);
        showAlert(result.message || 'Login failed');
      }
    } catch (error) {
      setAlertSuccessful(false);
      showAlert('Network request failed');
    }
  };

  const handleNavigate = () => {
      router.replace('/home');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {alertVisible && (
            <Animated.View style={[styles.alert, { opacity: alertOpacity, backgroundColor: alertSuccessful ? '#25a125' : '#ff4444' }]}>
              <Text style={styles.alertText}>{alertMessage}</Text>
            </Animated.View>
        )}
        <LinearGradient
          colors={['#0d1121', '#03204b']}
          style={styles.gradient}
        >
          <Text style={styles.title}>Bem-vindo ao</Text>
          <Text style={styles.titleBlue}>SubControl</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Logar</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    width: '85%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    width: '85%',
    backgroundColor: '#377ded',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  alert: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#ff4444',
    padding: 15,
    zIndex: 1000,
    alignItems: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
  },
});

