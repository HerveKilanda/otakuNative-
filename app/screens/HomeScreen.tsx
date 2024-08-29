import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { Asset } from "expo-asset";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

const HomeScreen = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      await Asset.loadAsync(require("../../assets/images/bluelock.jpg"));
      setImageLoaded(true);
    };

    loadImage();
  }, []);

  if (!imageLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <StyledView className="flex-1 justify-center items-center bg-white">
      <ImageBackground
        source={require("../../assets/images/bluelock.jpg")}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledText className="text-4xl font-bold text-white">
          Bienvenue sur OtakuLinks
        </StyledText>
        <StyledText className="text-lg text-white mt-2">
          Découvrez notre collection de mangas
        </StyledText>
        <StyledButton className="mt-4 bg-yellow-500 px-4 py-2 rounded">
          <StyledText className="text-white text-lg">
            Voir la Collection
          </StyledText>
        </StyledButton>
      </ImageBackground>
    </StyledView>
  );
};

export default HomeScreen;
