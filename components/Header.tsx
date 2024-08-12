import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Link } from "expo-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <View className="bg-blue-800 p-4 shadow-md shadow-black pt-8">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">Otakulinks</Text>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="p-2">
          <Text className="text-white text-xl">Menu</Text>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <ScrollView className="mt-4 bg-blue-800 rounded-lg p-2">
          <TextInput
            className="bg-gray-200 rounded-lg p-2 mb-2"
            placeholder="Rechercher un manga"
            placeholderTextColor="#000"
          />
          <Link href="/" className="p-2">
            <Text className="text-white text-lg">Home</Text>
          </Link>
          <Link href="/screens/Inscription" className="p-2">
            <Text className="text-white text-lg">Inscription</Text>
          </Link>
          
          <Link href="/screens/Connexion"  className="p-2">
            <Text className="text-white text-lg">Connexion</Text>
          </Link>
        </ScrollView>
      )}
    </View>
  );
}
