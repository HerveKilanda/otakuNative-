import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { getCsrf } from "../utils/csrf";
import AuthLayout from "@/components/AuthLayout";
import Notification from "@/components/Notification";

const API_URL = "https://d5f7-185-91-220-94.ngrok-free.app";

export default function InscriptionScreen() {
  const [isNotified, setIsNotified] = useState(false);
  const [alert, setAlert] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
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
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Inscription reussie :", responseData);
        setAlert(true);
        setIsNotified(true);
        reset();
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'inscription :", errorData);
        setAlert(false)
        setIsNotified(true);
      }
    } catch (error) {
      console.error("Erreur avec le backend :", error);
      setAlert(false)
      setIsNotified(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center justify-center  px-4">
          {isNotified && <Notification />}
          <View className="bg-black p-8 border-4 border-blue-800 rounded-lg w-80">
            <Text className="text-3xl font-bold text-center text-white mb-6">
              Inscription
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "L'email est requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "L'email n'est pas valide",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full py-2 px-4 bg-gray-200 rounded-lg mb-4 ${
                    errors.email ? "border-red-500" : "border-gray-400"
                  }`}
                  placeholder="Email"
                  placeholderTextColor="#000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 mb-2">{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Le mot de passe est requis",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full py-2 px-4 bg-gray-200 rounded-lg mb-4 ${
                    errors.password ? "border-red-500" : "border-gray-400"
                  }`}
                  placeholder="Mot de passe"
                  placeholderTextColor="#000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 mb-2">{errors.password.message}</Text>
            )}

            <Controller
              control={control}
              name="username"
              rules={{
                required: "Le nom d'utilisateur est requis",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`w-full py-2 px-4 bg-gray-200 rounded-lg mb-4 ${
                    errors.username ? "border-red-500" : "border-gray-400"
                  }`}
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor="#000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.username && (
              <Text className="text-red-500 mb-2">{errors.username.message}</Text>
            )}

            <TouchableOpacity
              className="bg-blue-500 py-2 px-4 rounded-lg mt-4"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text className="text-white text-center font-bold">
                  Valider
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AuthLayout>
  );
}
