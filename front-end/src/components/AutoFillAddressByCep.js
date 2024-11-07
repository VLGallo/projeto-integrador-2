import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import axios from "axios";

const AutoFillAddressByCep = ({ setCep, setLogradouro, setBairro }) => {
  const [CEP, setCEP] = useState("");
  const [error, setError] = useState("");

  const handleCepChange = async (newCep) => {
    setCEP(newCep);

    if (newCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        const { logradouro, bairro } = response.data;

        if (!response.data.erro) {
          setLogradouro(logradouro || "");
          setBairro(bairro || "");
          setCep(newCep || "");
          setError(""); 
        } else {
          setError("CEP não encontrado.");
        }
      } catch (err) {
        console.log(err);
        setError("Erro ao buscar o CEP.");
      }
    } else {
      setError("CEP inválido.");
    }
  };

  return (
    <View>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={CEP}
        onChangeText={handleCepChange}
        maxLength={8} 
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
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
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default AutoFillAddressByCep;
