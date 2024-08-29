import { View, Text } from "react-native";

export default function Notification() {
  return (
    <View className="mb-3">
      {alert ? (
        <View className="bg-green-600  text-3xl p-4 rounded-lg text-white">
          <Text>Félicitations !</Text>
        </View>
      ) : (
        <View className="bg-red-600 text-white text-3xl p-4 rounded-lg ">
          <Text>Erreur !</Text>
        </View>
      )}
    </View>
  );
}
