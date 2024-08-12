import { API_URL } from "@/constants/api";
import React from "react";
import { useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function ConnexionScreen() {
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

  const onSubmit = async (data: any) => {
    try {
      const reponse = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (reponse.status === 201) {
        console.log("Connexion reussie !");
        alert("Connexion reussie !");
        reset();
      } else {
        console.log("Inscription echoue !");
        alert("Connexion echoue !");
      }
    } catch (error) {
      console.error("Erreur dans l'inscription :", error);
      alert("Connexion echoue !");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="bg-white p-8 rounded-lg w-96">
        <Text className="text-3xl font-bold text-center text-black mb-6">Connexion</Text>
        <TextInput
          className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
          placeholder="Email"
          {...register("email", {
            required: "Ce champ est requis",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entrez une adresse email valide",
            },
          })}
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">
            {errors.email.message}
          </Text>
        )}
        <TextInput
          className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
          placeholder="Mot de passe"
          secureTextEntry
          {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{12,}$/,
              message:
                "Le mot de passe doit contenir au moins 12 caractères, une lettre minuscule, une lettre majuscule et un chiffre",
            },
            minLength: {
              value: 12,
              message: "Le mot de passe doit contenir au moins 12 caractères",
            },
          })}
        />
        {errors.password && (
          <Text className="text-red-500 mb-2">
            {errors.password.message}
          </Text>
        )}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-blueivy py-2 px-4 rounded mt-4">
          <Text className="text-white text-center">Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
