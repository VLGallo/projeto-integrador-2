import React from 'react';
import { Modal, Text, View, Pressable, Alert, StyleSheet } from 'react-native';

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
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalText}</Text>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#B20000",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
