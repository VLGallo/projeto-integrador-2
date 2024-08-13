import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import Template from "../components/TemplatePrincipal";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  IconButton,
  emphasize,
} from "@mui/material";
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
  const [motoboys, setMotoboys] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [carregandoMotoboys, setCarregandoMotoboys] = useState(false);
  const [carregandoPedidosDoDia, setCarregandoPedidosDoDia] = useState("");

  useEffect(() => {
    const carregarPedidosDoDia = async () => {
      try {
        setCarregandoMotoboys(true);

        const response = await axios.get(
          "https://zerissi.azurewebsites.net/pedido/motoboy/"
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

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 60 }]}>
          Relatório de Entregas
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!carregandoPedidosDoDia && (
          <View style={styles.container}>
            <TableContainer component={Paper}>
              <Table style={styles.tabela}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: 20 }}>Motoboy</TableCell>
                    <TableCell style={{ fontSize: 20 }}>Pedido</TableCell>
                    <TableCell style={{ fontSize: 20 }}>Finalização</TableCell>
                    <TableCell style={{ fontSize: 20 }}>Entregas</TableCell>
                  </TableRow>
                </TableHead>
         
                <TableBody>
                    {Object.keys(pedidosDoDia).map((motoboyId) => (
                      <TableRow key={motoboyId}>
                        <TableCell style={{ fontSize: 20 }}>
                          {pedidosDoDia[motoboyId].motoboy.nome}
                        </TableCell>
                        <TableCell style={{ fontSize: 20 }}>
                          <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {pedidosDoDia[motoboyId].pedidos
                              .filter((pedido) => pedido.status === "Entregue") 
                              .map((pedido) => (
                                <li key={pedido.id}>{pedido.id}</li>
                              ))}
                          </ul>
                        </TableCell>
                        <TableCell style={{ fontSize: 20 }}>
                          <div>
                            {pedidosDoDia[motoboyId].pedidos
                              .filter((pedido) => pedido.status === "Entregue") 
                              .map((pedido) => (
                                <li key={pedido.id}>
                                  {pedido.data_hora_finalizacao
                                    ? new Date(
                                        pedido.data_hora_finalizacao
                                      ).toLocaleTimeString()
                                    : "-"}
                                </li>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: 20 }}>
                          {pedidosDoDia[motoboyId].pedidos.filter(
                            (pedido) => pedido.status === "Entregue"
                          ).length}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </TableContainer>
          </View>
        )}

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
  image: {
    width: 80,
    height: 100,
  },
  textPedido: {
    fontWeight: "bold",
    color: "#B20000",
    textAlign: "center",
    fontFamily: "Impact",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    backgroundColor: "#fff",
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

export default TelaRelatorio;
