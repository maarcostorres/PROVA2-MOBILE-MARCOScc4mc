import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage('Preencha os campos restantes.');
      setMessageType('error');
      return;
    }

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        setMessage('Email ou senha incorretos.');
        setMessageType('error');
      } else if (data) {
        setMessage('Logado com sucesso!');
        setMessageType('success');

        setTimeout(() => {
          navigation.navigate('Main');
        }, 2000);
      }
    } catch (error) {
      setMessage('Tente novamente.');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require('../assets/back.gif')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.p}>Bem Vindo ao Login</Text>

          {message ? (
            <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
              {message}
            </Text>
          ) : null}

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

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.esqueceu}>Criar uma Conta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
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

  p: {
    marginBottom: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },

  button: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    width: '100%',
    height: 55,
  },

  container2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },

  message: {
    marginBottom: 20,
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
