import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Keyboard } from 'react-native';
import Api from './src/service/api';

export default function App() {
  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [ cepUser, setCepUser] = useState(null)

async function buscar () {
    if(cep == '') {
      alert('Digite um cep valido')
      setCep('')
      return;
    }
    try {
      const response = await Api.get(`/${cep}/json`)
      setCepUser(response.data)
      Keyboard.dismiss();
    } catch (error){
      console.log('deu merda ein' + error)
      alert("digite um cep existente")
    }
    
  }

  function limpar () {
    setCep('');
    inputRef.current.focus();
    setCepUser(null)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>DIgite o CEP desejado</Text>
        <TextInput
        style={styles.input}
        placeholder='20220050'
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType='numeric'
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: '#eb2f06'}]}
          onPress={limpar}
          >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.botao, {backgroundColor: '#1e3799'}]}
        onPress={buscar}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
        <View style={styles.areaResultado}>
        <Text style={styles.title}> CEP: {cepUser.cep}</Text>
        <Text style={styles.title}>Logradouro:{cepUser.logradouro} </Text>
        <Text style={styles.title}>Cidade: {cepUser.estado}</Text>
        <Text style={styles.title}>Estado: {cepUser.uf}</Text>
        <Text style={styles.title}>Bairro: {cepUser.bairro}</Text>
        </View>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 25,
    marginTop: 35,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#121210',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 18
  },
  areaBtn : {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  botao: {
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue'
  },
  botaoText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
  areaResultado: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 12,
    backgroundColor: '#fff', // Fundo branco para a área de resultado
    borderRadius: 10, // Bordas arredondadas
    padding: 20, // Espaçamento interno
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Sombra leve
    shadowOpacity: 0.3, // Transparência da sombra
    shadowRadius: 4, // Difusão da sombra
    elevation: 5, // Efeito de sombra no Android
    width: '90%', // Limita a largura a 90% da tela
  },
  title: {
    fontSize: 18, // Tamanho da fonte
    color: '#333', // Cor do texto
    fontWeight: 'bold', // Texto em negrito
    marginBottom: 10, // Espaçamento entre as linhas
  },
});
