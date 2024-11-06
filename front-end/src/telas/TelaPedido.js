import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Picker,
  Dimensions,
} from "react-native";
import Template from "../components/TemplatePrincipal";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../components/CustomModal";

const TelaPedido = () => {
  const navigation = useNavigation();
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [clientes, setClientes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [carregandoClientes, setCarregandoClientes] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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


  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cliente");
        setClientes(response.data);
        setCarregandoClientes(false);
      } catch (error) {
        console.log(error);
      }
    };

    carregarCliente();
  }, []);

  const handleSalvar = async () => {
    const clienteSelecionadoObj = clientes.find(
      (cliente) => cliente.id == clienteSelecionado
    );
    console.log(clienteSelecionadoObj);

    const produtosIds = itens.map((item) => item);
    console.log(produtosIds);

    try {
      const response = await axios.post("localhost/pedido/add", {
        produtos: produtosIds,
        cliente: clienteSelecionado,
        funcionario: 2,
      });

      if (response.status >= 200 && response.status < 400) {
        setModalVisible(true);
        setItens([]);
        setClienteSelecionado("");
        setSelectedProduct("");
      }
    } catch (error) {
      setModalVisible(true);
      console.log(error);
    }
  };

  const carregarProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8000/produto");
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const buscarProduto = (produtoId) => {
    const produtoEncontrado = produtos.find(
      (produto) => produto.id == produtoId
    );
    return produtoEncontrado;
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleCancelar = () => {
    setClienteSelecionado([]);
    setItens([]);
  };

  const adicionarItem = () => {
    if (selectedProduct) {
      setItens((prevItens) => [...prevItens, selectedProduct]);
      setSelectedProduct("");
    }
  };
  const removerItem = (index) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
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
    tituloContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
  });

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText="Pedido cadastrado com sucesso"
      />
      <View>
        <View style={styles.tituloContainer}>
          <Text
            style={[
              styles.textPedido,
              { fontSize: isMobile ? 30 : 60, marginTop: 80 },
            ]}
          >
            Pedidos
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View>
              <Text style={styles.label}>Cliente</Text>
              <Picker
                style={styles.input}
                selectedValue={clienteSelecionado}
                onValueChange={(itemValue, itemIndex) =>
                  setClienteSelecionado(itemValue)
                }
              >
                <option value="">Selecione um Cliente</option>
                {!carregandoClientes &&
                  clientes.map((cliente) => (
                    <Picker.Item
                      key={cliente.id}
                      label={cliente.nome}
                      value={cliente.id}
                    />
                  ))}
              </Picker>
            </View>

            <View style={{ marginTop: 20 }}>
              <Grid container direction="column" spacing={0}>
                <Typography style={{ fontWeight: "bold",  color: isDarkMode ? "#000" : "#fff" }}>Itens</Typography>
                {itens.map((item, index) => (
                  <Grid item container key={index} alignItems="center">
                    <Grid item xs={8}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true} // Altere para o estado do checkbox
                            onChange={() => {}}
                            color="primary"
                          />
                        }
                        label={buscarProduto(item).nome}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removerItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item container alignItems="center">
                  <Grid item xs={8}>
                    <select
                      style={styles.input}
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">Selecione um produto</option>
                      {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={adicionarItem}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={[styles.button, { marginRight: 10 }]}
                onPress={handleSalvar}
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

          <View style={{ flex: 1, flexDirection: "column" }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={[styles.image, { width: 440, height: 440 }]}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </Template>
  );
};

export default TelaPedido;
