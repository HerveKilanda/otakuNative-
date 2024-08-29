import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/button";
import React from "react";
import { useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

function ResetPasswordConfirmationScreen() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${""}/auth/reset-password-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        console.log("Reinitialisation du mot de passe reussie !");
        alert("Reinitialisation du mot de passe reussie !");
        reset();
      } else {
        console.log("Reinitialisation du mot de passe echoue !");
        alert("Reinitialisation du mot de passe echoue !");
      }
    } catch (error) {
      console.error("Erreur dans la reinitialisation du mot de passe :", error);
      alert("Reinitialisation du mot de passe echoue !");
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 justify-center items-center ">
        <View className="bg-black p-8  border-4 border-blue-800 rounded-lg w-96">
          <Text className="text-3xl font-bold text-center text-white mb-6">
            Confirmation de la reinitialisation du mot de passe
          </Text>
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Email"
            placeholderTextColor="#000"
            {...register("email", {
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "L'email n'est pas valide",
              },
            })}
          />
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Code"
            placeholderTextColor="#000"
            {...register("code", {
              required: "Ce champ est requis",
            })}
          />
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Mot de passe"
            placeholderTextColor="#000"
            secureTextEntry
            {...register("password", {
              required: "Ce champ est requis",
            })}
          />
          <Button
            title="Reinitialiser le mot de passe"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
