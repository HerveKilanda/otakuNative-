import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/button";
import React from "react";
import { useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      const reponse = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (reponse.status === 201) {
        console.log(
          "Le lien de reinitialisation du mot de passe a bien ete envoye !",
        );
        alert(
          "Le lien de reinitialisation du mot de passe a bien ete envoye !",
        );
        reset();
      } else {
        console.log(
          "l'envoie du lien de reinitialisation du mot de passe echoue !",
        );
        alert("l'envoie du lien de reinitialisation du mot de passe echoue !");
      }
    } catch (error) {
      console.error(
        "Erreur dans l'envoie du lien de reinitialisation du mot de passe :",
        error,
      );
      alert("l'envoie du lien de reinitialisation du mot de passe echoue !");
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 justify-center items-center ">
        <View className="bg-black p-8  border-4 border-blue-800 rounded-lg w-96">
          <Text className="text-3xl font-bold text-center text-white mb-6">
            Reinitialisation du mot de passe
          </Text>
          <TextInput
            className="w-full py-2 px-4 bg-gray-200 rounded border border-gray-400 mb-4"
            placeholder="Email"
            placeholderTextColor="#000"
            {...register("email", {
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email invalide",
              },
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
