import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import Template from "../components/TemplatePrincipal";

const TelaHome = () => {
  return (
    <Template>
      <ImageBackground
        source={require("../../assets/images/imagem-home.jpg")}
        resizeMode="cover"
        style={styles.backImage}
      >
        <View style={styles.tituloContainer}>
          <Text style={[styles.textPedido, { fontSize: 60 }]}>
            Gestão de Entregas
          </Text>
          <View style={{ height: "80vh" }}></View>
        </View>
      </ImageBackground>
    </Template>
  );
};

const styles = StyleSheet.create({
  textPedido: {
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Impact",
  },
  backImage: {
    flex: 2,
    justifyContent: "center",
    width:"100%"
  },
  tituloContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
export default TelaHome;
