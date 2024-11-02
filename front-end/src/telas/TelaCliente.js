import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from "react-native";
import Template from "../components/TemplatePrincipal";
import CustomModal from "../components/CustomModal";
import AutoFillAddressByCep from "../components/AutoFillAddressByCep";
import axios from "axios";

const TelaCliente = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleSalvar = async () => {
    if (!isFormValid()) {
      Alert.alert("Atenção", "Todos os campos precisam ser preenchidos.");
      return; // Impede o salvamento se os campos não estiverem válidos
    }

    try {
      const response = await axios.post("http://localhost:8000/cliente/add", {
        nome,
        telefone,
        cep,
        logradouro,
        bairro,
        cidade,
        numero,
        complemento,
      });

      if (response.status === 201) {
        setModalVisible(true);
        // Limpar os campos após o sucesso
        setNome("");
        setTelefone("");
        setLogradouro("");
        setBairro("");
        setCidade("");
        setNumero("");
        setComplemento("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelar = () => {
    // Limpar os campos ao cancelar
    setNome("");
    setTelefone("");
    setLogradouro("");
    setBairro("");
    setCidade("");
    setNumero("");
    setComplemento("");
  };



  const isFormValid = () => {
    return nome && telefone && logradouro && bairro && cidade && numero; // Verifica se todos os campos estão preenchidos
  };

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText="Cliente cadastrado com sucesso"
      />

      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 60, fontWeight: "bold" }]}>
          Cadastro de Clientes
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>

          {/* Utilizando o componente para buscar o CEP e preencher o logradouro automaticamente */}
          <AutoFillAddressByCep
            setCep={setCep}
            setLogradouro={setLogradouro}
            setBairro={setBairro}
            setCidade={setCidade}
          />

          <View>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>
          <View>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>
          <View>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Complemento</Text>
              <TextInput
                style={styles.input}
                value={complemento}
                onChangeText={setComplemento}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: isFormValid() ? "#007BFF" : "#A9A9A9" }, // Cor do botão depende do estado
              ]}
              onPress={handleSalvar}
              disabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#B20000" }]}
              onPress={handleCancelar}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={[styles.image, { width: 440, height: 440 }]}
            resizeMode="contain"
          />
        </View>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    width: "80%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  // Adicione mais estilos conforme necessário
});

export default TelaCliente;
