import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Template from "../components/TemplatePrincipal";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TelaRelatorio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [motoboys, setMotoboys] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [carregandoMotoboys, setCarregandoMotoboys] = useState(false);
  const [carregandoPedidosDoDia, setCarregandoPedidosDoDia] = useState("");

  useEffect(() => {
    const carregarPedidosDoDia = async () => {
      try {
        setCarregandoMotoboys(true);

        const response = await axios.get(
          "http://localhost:8000/pedido/motoboys"
        );

        setPedidosDoDia(response.data);
        console.log(response.data);
        setCarregandoPedidosDoDia(false);
      } catch (error) {
        console.log(error);
      }
    };
    carregarPedidosDoDia();
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get("window").width;
      setIsMobile(width < 768);
    };
    Dimensions.addEventListener("change", updateLayout);
    updateLayout();

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const styles = StyleSheet.create({
    image: {
      width: 80,
      height: 100,
    },
    textRelatorio: {
      fontWeight: "bold",
      color: "#B20000",
      textAlign: "center",
      fontFamily: "LuckiestGuy",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: isDarkMode ? "#000" : "#fff",
    },
    input: {
      height: 40,
      borderColor: isDarkMode ? "#ccc" : "#434141",
      backgroundColor: isDarkMode ? "#fff" : "#434141",
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 16,
      paddingHorizontal: 5,
      width: "100%",
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
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
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
      justifyContent: "center",
      marginBottom: 20,
    },
    Tabela: {
      fontSize: 16,
    },
  });

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <View style={[styles.containerSecundario, { margin: 30 }]}>
        <View style={styles.tituloContainer}>
          <Text
            style={[
              styles.textRelatorio,
              { fontSize: isMobile ? 30 : 60, marginTop: 30 },
            ]}
          >
            Relatório de Entregas
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!carregandoPedidosDoDia && (
          <View style={styles.container}>
            <TableContainer
              component={Paper}
              style={{
                backgroundColor: isDarkMode ? "#fff" : "#434141",
                marginHorizontal: "auto",
              }}
            >
              <Table style={styles.tabela}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: isMobile ? 14 : 20, // Tamanho da fonte menor para mobile
                        fontWeight: "bold", // Negrito
                        color: isDarkMode ? "#000" : "#fff",
                        padding: isMobile ? 4 : 16, // Padding menor para mobile
                      }}
                    >
                      Motoboy
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: isMobile ? 14 : 20, // Tamanho da fonte menor para mobile
                        fontWeight: "bold", // Negrito
                        color: isDarkMode ? "#000" : "#fff",
                        padding: isMobile ? 4 : 16, // Padding menor para mobile
                      }}
                    >
                      Pedido
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: isMobile ? 14 : 20, // Tamanho da fonte menor para mobile
                        fontWeight: "bold", // Negrito
                        color: isDarkMode ? "#000" : "#fff",
                        padding: isMobile ? 4 : 16, // Padding menor para mobile
                      }}
                    >
                      Finalização
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: isMobile ? 14 : 20, // Tamanho da fonte menor para mobile
                        fontWeight: "bold", // Negrito
                        color: isDarkMode ? "#000" : "#fff",
                        padding: isMobile ? 4 : 16, // Padding menor para mobile
                      }}
                    >
                      Entregas
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Object.keys(pedidosDoDia).map((motoboyId) => (
                    <TableRow key={motoboyId}>
                      <TableCell
                        style={{
                          fontSize: isMobile ? 14 : 18, // Tamanho da fonte ajustado para cada dispositivo
                          color: isDarkMode ? "#000" : "#fff",
                          padding: isMobile ? 4 : 16,
                        }}
                      >
                        {pedidosDoDia[motoboyId].motoboy.nome}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isMobile ? 14 : 18,
                          color: isDarkMode ? "#000" : "#fff",
                          padding: isMobile ? 4 : 16,
                        }}
                      >
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                          {pedidosDoDia[motoboyId].pedidos
                            .filter((pedido) => pedido.status === "Entregue")
                            .map((pedido) => (
                              <li
                                key={pedido.id}
                                style={{ color: isDarkMode ? "#000" : "#fff" }}
                              >
                                {pedido.id}
                              </li>
                            ))}
                        </ul>
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isMobile ? 14 : 18,
                          color: isDarkMode ? "#000" : "#fff",
                          padding: isMobile ? 4 : 16,
                        }}
                      >
                        <div>
                          {pedidosDoDia[motoboyId].pedidos
                            .filter((pedido) => pedido.status === "Entregue")
                            .map((pedido) => (
                              <li
                                key={pedido.id}
                                style={{ color: isDarkMode ? "#000" : "#fff" }}
                              >
                                {pedido.data_hora_finalizacao
                                  ? new Date(
                                      pedido.data_hora_finalizacao
                                    ).toLocaleTimeString()
                                  : "-"}
                              </li>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: isMobile ? 14 : 18,
                          color: isDarkMode ? "#000" : "#fff",
                          padding: isMobile ? 4 : 16,
                          textAlign: "center",
                        }}
                      >
                        {
                          pedidosDoDia[motoboyId].pedidos.filter(
                            (pedido) => pedido.status === "Entregue"
                          ).length
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </View>
        )}

        {!isMobile && (
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={[styles.image, { width: 440, height: 440 }]}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </Template>
  );
};

export default TelaRelatorio;
