import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goalItems, setGoalItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const handleGoal = () => {
    setGoalItems([...goalItems, enteredGoal]);
    setEnteredGoal("");
  };

  const remooveModal = () => {
    setShowModal(true);
  };

  const remobeGoal = (goalItem) => {
    const fillteredItem = goalItems.filter((item) => item !== goalItem);
    setGoalItems(fillteredItem);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Set you'r Goals.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={goalInputHandler}
          value={enteredGoal}
          placeholder="Course Goal"
          style={styles.textInput}
        />
        <Button onPress={handleGoal} title="Add you'r goal" />
      </View>
      <FlatList
        data={goalItems}
        renderItem={(item) => (
          <View>
            <Text onPress={remooveModal} style={styles.textCard}>
              {item.item}
            </Text>
            <Modal visible={showModal}>
              <View>
                <Text onPress={() => setShowModal(false)}>
                  Are you sure you wanna delete {item.item}
                </Text>
                <View>
                  <Button
                    title="Delete"
                    onPress={() => remobeGoal(item.item)}
                  />
                </View>
              </View>
            </Modal>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "whitesmoke",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  mainHeader: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  cardContainer: {
    marginTop: 10,
  },
  textCard: {
    backgroundColor: "#FFFF",
    paddingLeft: 10,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
  },
});
