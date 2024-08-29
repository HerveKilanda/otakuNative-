/* eslint-disable prettier/prettier */
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/button";
// import { API_URL } from "@/constants/api";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { getCsrf } from "../utils/csrf";
import Notification from "@/components/Notification";
//
const API_URL = "https://d5f7-185-91-220-94.ngrok-free.app";
export default function ConnexionScreen() {
  const [csrfToken, setCsrfToken] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const protection = await getCsrf();
      setCsrfToken(protection);
    };

    fetchCsrfToken();
  }, []);

  const onSubmit = async (data) => {
    try {
      const reponse = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (reponse.ok) {
        console.log("Connexion reussie !");
        setAlert(true);
        setIsNotified(true);
        reset();
        reset();
      } else {
        console.log("Connexion echoue !", reponse.status);
        setAlert(false)
        setIsNotified(true);
      }
    } catch (error) {
      console.error("Erreur dans la connexion :", error);
      setAlert(false)
      setIsNotified(true);
    }
  };

  return (
    <AuthLayout>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center ">
      {isNotified && <Notification />}
        <View className="bg-black p-8  border-4 border-blue-800 rounded-lg w-96">
          <Text className="text-3xl font-bold text-center text-white mb-6">
            Connexion
          </Text>
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Email"
            placeholderTextColor="#000"
          />
          {errors.email && (
            <Text className="text-red-500 mb-2">{errors.email.message}</Text>
          )}
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Mot de passe"
            placeholderTextColor="#000"
            secureTextEntry
          />
          {errors.password && (
            <Text className="text-red-500 mb-2">{errors.password.message}</Text>
          )}

          <Link href="/screens/Reset-password" className="text-blue-500 text-end ">
            Mot de passe oublie ?
          </Link>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-blueivy py-2 px-4 rounded mt-4"
          >
            <Text className="text-white text-center bg-blueivy">Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </AuthLayout>
  );
}
