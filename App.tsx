import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, FlatList, Image } from 'react-native';

// Import the image you want to use for the history button
import historyImage from './Src/images/download.png'; // Update the path based on where you place the image

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleInput = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(input).toString();
      setResult(calculatedResult);
      setHistory([...history, { input, result: calculatedResult }]);
    } catch (error) {
      setResult('Error');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clearHistory = () => {
    setHistory([]);
    toggleModal();
  };

  const renderButton = (value, style) => (
    <TouchableOpacity
      key={value}
      style={[styles.button, style]}
      onPress={() => handleInput(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  const buttonValues = [
    ['C', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.input} = {item.result}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton} onPress={toggleModal}>
            <Image source={historyImage} style={styles.historyImage} />
          </TouchableOpacity>
        </View>
        {buttonValues.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button) =>
              button === '0'
                ? renderButton(button, styles.zeroButton)
                : renderButton(button, 
                    button === '=' ? styles.equalsButton 
                    : ['/', '*', '-', '+'].includes(button) ? styles.operatorButton 
                    : styles.specialButton
                  )
            )}
          </View>
        ))}
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={history}
              renderItem={renderHistoryItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
              <Text style={styles.clearButtonText}>Clear History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#000',
  },
  inputText: {
    fontSize: 40,
    color: '#fff',
  },
  resultText: {
    fontSize: 30,
    color: '#888',
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  zeroButton: {
    flex: 2,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 50,
  },
  operatorButton: {
    backgroundColor: '#fa8231',
  },
  equalsButton: {
    backgroundColor: '#fa8231',
  },
  specialButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
  historyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 90,
    height: 55,
  },
  historyImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 300,
  },
  modalContent: {
    backgroundColor: '#000',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    width: '70%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
  },
  historyItem: {
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  historyText: {
    fontSize: 20,
    color: '#fff',
  },
  clearButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fa8231',
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Calculator;
