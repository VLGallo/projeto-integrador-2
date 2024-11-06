import React from 'react';
import { Modal, Text, View, Pressable, Alert, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 768;

const CustomModal = ({ modalVisible, setModalVisible, modalText }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal fechado.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isSmallScreen && styles.modalViewSmall]}>
          <Text style={[styles.modalText, isSmallScreen && styles.modalTextSmall]}>{modalText}</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.modalButton}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewSmall: {
    width: '80%', // reduzindo largura em telas pequenas
    padding: 20, // reduzindo o padding para economizar espaço
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalTextSmall: {
    fontSize: 16, // ajustando o tamanho do texto para telas menores
  },
  modalButton: {
    backgroundColor: "#B20000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default CustomModal;
