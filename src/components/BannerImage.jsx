import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const BannerImage = ({ imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.banner} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 0, 
    marginBottom: 20,
    position: "relative",
  },
  banner: {
    width: "100%", 
    height: 220, 
   // borderRadius: 15,
    opacity: 0.9,
  },
  overlay: {
    position: "absolute",
    top: "65%", 
    left: "50%", 
    transform: [{ translateX: -50 }, { translateY: -15 }], 
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

});

export default BannerImage;
