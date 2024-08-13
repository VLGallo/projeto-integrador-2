import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideNavigation = ({}) => {
  const navigation = useNavigation();
  const entrarTelaHome = () => {
    navigation.navigate("TelaHome"); // Navega para a tela de pedido
  };

  const entrarTelaPedido = () => {
    navigation.navigate("TelaPedido"); // Navega para a tela de pedido
  };
  const entrarTelaAtribuicao = () => {
    navigation.navigate("TelaAtribuicao");
  };

  const entrarTelaCadastro = () => {
    navigation.navigate("TelaCadastro");
  };

  const entrarTelaRelatorio = () => {
    navigation.navigate("TelaRelatorio");
  };

  const entrarTelaMotoboy = () => {
    navigation.navigate("TelaMotoboy");
  };



  const destroyCookie = () => {
    try {
      AsyncStorage.removeItem("usuario");
      console.log("Cookie destruído com sucesso");
    } catch (error) {
      console.error("Erro ao destruir o cookie:", error);
    }
  };

  const handleSair = () => {
    destroyCookie();
    navigation.navigate("TelaLogin");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={entrarTelaHome} style={styles.button}>
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
      <Pressable onPress={entrarTelaPedido} style={styles.button}>
        <Text style={styles.buttonText}>Pedido</Text>
      </Pressable>
      <Pressable onPress={entrarTelaAtribuicao} style={styles.button}>
        <Text style={styles.buttonText}>Atribuição</Text>
      </Pressable>
      <Pressable  onPress={entrarTelaRelatorio} style={styles.button}>
        <Text style={styles.buttonText}>Relatório</Text>
      </Pressable>
      <Pressable onPress={entrarTelaCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastro</Text>
      </Pressable>
  
      <Pressable
        onPress={handleSair}
        style={[styles.button, { backgroundColor: "#B20000" }]}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#015500",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SideNavigation;
