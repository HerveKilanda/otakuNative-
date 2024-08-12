import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);

type ButtonProps = {
  onPress: () => void;
  title: string;
  bgColor?: string;
  textColor?: string;
  className?: string; // Pour ajouter des classes Tailwind supplémentaires si nécessaire
};

export default function Button({
  onPress,
  title,
  bgColor = "bg-blue-500", // Couleur de fond par défaut
  textColor = "text-white",  // Couleur du texte par défaut
  className = "",            // Classes supplémentaires par défaut
}: ButtonProps) {
  return (
    <StyledButton
      onPress={onPress}
      className={`px-4 py-2 rounded ${bgColor} ${className}`}
    >
      <StyledText className={`text-lg text-center ${textColor}`}>
        {title}
      </StyledText>
    </StyledButton>
  );
}
