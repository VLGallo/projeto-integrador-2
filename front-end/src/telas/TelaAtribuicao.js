import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Picker,
} from "react-native";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Template from "../components/TemplatePrincipal";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CustomModal from "../components/CustomModal";

const TelaHome = () => {
  const navigation = useNavigation();

  const [pedido, setPedido] = useState("");
  const [selectedMotoboy, setSelectedMotoboy] = useState("");
  const [selectedPedido, setSelectedPedido] = useState("");
  const [motoboys, setMotoboys] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [carregandoMotoboys, setCarregandoMotoboys] = useState(true);
  const [carregandoPedidos, setCarregandoPedidos] = useState(true);

  useEffect(() => {
    console.log(selectedMotoboy);
  });

  useEffect(() => {
    const carregarMotoboy = async () => {
      try {
        const response = await axios.get("http://localhost:8000/motoboy");

        setMotoboys(response.data);
        setCarregandoMotoboys(false);
      } catch (error) {
        console.log(error);
      }
    };

    const carregarPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/pedido");
        console.log(response.data);
        setPedidos(response.data);
        setCarregandoPedidos(false);
      } catch (error) {
        console.log(error);
      }
    };

    carregarMotoboy();
    carregarPedidos();
  }, []);

  const handleAtribuicao = async () => {
    for (let i = 0; i < selectedPedidos.length; i++) {
      try {
        const response = await axios.put(
          "http://localhost:8000/pedido/" +
            selectedPedidos[i] +
            "/atribuir-motoboy/" +
            selectedMotoboy
        );
      } catch (error) {
        setModalVisible(true);
        console.log(error);
      }

      setModalVisible(true);
    }
  };

  const handleCancelar = () => {
    setSelectedPedidos([]);
    setSelectedMotoboy("");
  };

  const buscarPedido = (pedidoId) => {
    const pedidoEncontrado = pedidos.find((pedido) => pedido.id == pedidoId);
    console.log("Pedido encontrado: " + pedidoEncontrado, pedidoId);
    return pedidoEncontrado;
  };

  const adicionarPedido = () => {
    setSelectedPedidos([...selectedPedidos, selectedPedido]);
    setSelectedPedido("");
  };

  const removerPedido = (index) => {
    const novosPedidos = [...selectedPedidos];
    novosPedidos.splice(index, 1);
    setSelectedPedidos(novosPedidos);
  };

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText="Pedido(s) atribuído(s) com sucesso"
      />
      {/* Conteúdo do pedido */}
      <View style={styles.containerSecundario}>
        <View style={styles.tituloContainer}>
          <Text style={[styles.textPedido, { fontSize: 60 }]}>
            Atribuição de Pedidos
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View>
              <Text style={styles.label}>Motoboy</Text>
              <Picker
                selectedValue={selectedMotoboy}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMotoboy(itemValue)
                }
                style={styles.input}
              >
                <Picker.Item label="Selecione um motoboy" value="" />
                {!carregandoMotoboys &&
                  motoboys.map((motoboy) => (
                    <Picker.Item
                      key={motoboy.id}
                      label={motoboy.nome}
                      value={motoboy.id}
                    />
                  ))}
              </Picker>
            </View>

            <View style={{ marginTop: 20 }}>
              <Grid container direction="column" spacing={0}>
                <Typography style={{ fontWeight: "bold" }}>Itens</Typography>
                {selectedPedidos.map((item, index) => (
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
                        label={buscarPedido(item).id}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removerPedido(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item container alignItems="center">
                  <Grid item xs={8}>
                    <select
                      style={styles.input}
                      value={selectedPedido}
                      onChange={(e) => setSelectedPedido(e.target.value)}
                    >
                      <option value="">Selecione um Pedido</option>
                      {pedidos.map((pedido) => (
                        <option key={pedido.id} value={pedido.id}>
                          {pedido.id}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={adicionarPedido}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, { marginRight: 10 }]}
                onPress={handleAtribuicao}
              >
                <Text style={styles.buttonText}>Atribuir</Text>
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
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 5,
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
    justifyContent: "center", // Centralizando os elementos dentro do container do título
    marginBottom: 20,
  },
});

export default TelaHome;
