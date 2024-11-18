import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Registro({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    setMessage('');
    setMessageType('');

    if (!nomeCompleto || !email || !senha) {
      setMessage('Preencha os campos restantes.');
      setMessageType('error');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('Insira um email válido.');
      setMessageType('error');
      return;
    }

    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (error) {
        setMessage(error.message);
        setMessageType('error');
        return;
      }

      setMessage('Sua conta foi criada!');
      setMessageType('success');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/back.gif')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.p1}>Área de Cadastro</Text>

          {message ? (
            <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
              {message}
            </Text>
          ) : null}

          <TextInput
            label="Nome Completo"
            value={nomeCompleto}
            onChangeText={(text) => setNomeCompleto(text)}
            style={styles.textInput}
            theme={{ colors: { primary: '#0066cc' } }}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            theme={{ colors: { primary: '#0066cc' } }}
          />

          <TextInput
            label="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry={true}
            style={styles.textInput}
            theme={{ colors: { primary: '#0066cc' } }}
          />

          <View style={styles.container3}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: '80%',
    backgroundColor: 'rgba(128, 128, 128, 0.8)', // Fundo cinza transparente
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  p1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
  },

  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
    height: 55,
  },

  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },

  cancelar: {
    color: '#0066cc',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  button: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  message: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },

  error: {
    color: 'black',
  },

  success: {
    color: 'black',
  },
});
