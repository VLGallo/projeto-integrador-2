import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../components/CustomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TelaLogin = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const getCookie = async () => {
    const valorDoCookie = await AsyncStorage.getItem("usuario");
    return valorDoCookie;
  };

  const verificaLogado = async () => {
    try {
      const cookie = await getCookie("usuario");
      if (cookie) {
        navigation.navigate("TelaHome");
      }
    } catch (error) {
      console.error("Erro ao verificar se está logado:", error);
    }
  };

  useEffect(() => {
    verificaLogado();
  }, []); // O segundo argumento vazio [] significa que este efeito só será executado após a primeira renderização

  const setCookie = async (usuario) => {
    try {
      await AsyncStorage.setItem("usuario", usuario);
      console.log("Cookie definido com sucesso");
    } catch (error) {
      console.error("Erro ao definir o cookie:", error);
    }
  };

  const entrarTelaHome = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          usuario: usuario,
          senha: senha,
        }
      );

      console.log(response);

      if (response.status === 200) {
        navigation.navigate("TelaHome");
        setCookie(usuario);
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      setModalVisible(true);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText="Credenciais Inválidas"
      />
      <ImageBackground
        source={require("../../assets/images/bg-opaco.png")}
        resizeMode="cover"
        style={styles.backImage}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(178,0,0,0.7)",
          }}
        >
          <View>
            <Text style={styles.SistemaTitulo}>Gestão de Entregas</Text>
            <Text style={styles.SistemaSubTitulo}>Casa Zé Rissi</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.rightHalfContent}>
          <Text style={styles.text}> Login </Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={(text) => setUsuario(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry
            focusable={true}
          />
          <Pressable onPress={entrarTelaHome} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
      </View>

      {/* Imagem no centro */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={[styles.imageLogo, styles.centerImage]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  halfContainer: {
    flex: 1,
  },
  rightHalfContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontFamily: "Impact",
    marginBottom: 10,
    color: "#B20000",
  },
  backImage: {
    flex: 2,
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#015500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  SistemaTitulo: {
    fontFamily: "Impact",
    fontSize: 80,
    color: "white",
  },
  SistemaSubTitulo: {
    fontFamily: "Impact",

    fontSize: 40,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  centerImage: {
    position: "absolute",
    top: "50%",
    left: "65%",
    transform: [{ translateX: -200 }, { translateY: -10 }],
    width: 300,
    height: 300,
  },
});

export default TelaLogin;
