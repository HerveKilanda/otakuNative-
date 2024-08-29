import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { View, ImageBackground, ActivityIndicator } from "react-native";
const ImageDeFond = require("../assets/images/bluelock.jpg");

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const loadImage = async () => {
      await Asset.loadAsync(ImageDeFond);
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={ImageDeFond}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthLayout;
