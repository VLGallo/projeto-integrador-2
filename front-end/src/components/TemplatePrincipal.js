import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SideNavigation from "../components/SideNavigation";

const Template = ({ children, imagem }) => {

  useEffect(()=>{
    console.log("teste" + imagem);
  })

  const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "row",
    },
    leftContainer: {
      flex: 2,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "rgba(255, 255, 255, 0.0)",
    },
    rightContainer: {
      flex: 1,
      width: 20,
    },
    image: {
      width: 80,
      height: 100,
    },
    textPedido: {
      fontFamily: "Impact",
      fontWeight: "bold",
      color: "#B20000",
      textAlign: "center", // Centralizando o texto
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    input: {
      height: 40,
      width: 150,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 16,
      paddingHorizontal: 5,
      backgroundColor: "#fff",
      width: "80%",
    },
    button: {
      backgroundColor: "#015500",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    posicaoImage: {
      marginLeft: 20,
    },
    menuSuperior: {
      flexDirection: "row",
      justifyContent: "center", // Centralizando os botões
      alignItems: "center",
    },
    menuButton: {
      backgroundColor: "#015500",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 10,
    },
    menuButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    tituloContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center", // Centralizando os elementos dentro do container do título
      marginBottom: 20,
    }, 
    backImage: {
      flex: 2,
      justifyContent: "center",
      width:"100%"
    },
  });

  return (
    <View style={styles.containerPrincipal}>
      <ImageBackground
        source={require("../../assets/images/bg-opaco.png")}
        resizeMode="cover"
        style={styles.backImage}
      >
        <View style={styles.leftContainer}>{children}</View>
      </ImageBackground>

      <View style={styles.rightContainer}>
        <SideNavigation />
      </View>
    </View>
  );
};



export default Template;
