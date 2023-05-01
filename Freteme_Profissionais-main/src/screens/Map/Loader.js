import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { scale } from "../../components/globalStyles";

const Loader = (props) => {
  const markerAnimation = useRef(new Animated.Value(0)).current;
  const shadowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(markerAnimation, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shadowAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(markerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shadowAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(animate);
    };
    animate();
  }, []);

  const markerTranslateX = markerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -5],
  });

  const markerTranslateY = markerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -5],
  });

  const shadowScale = shadowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.loader}>
      <Animated.View
        style={[
          styles.marker,

          {
            borderColor: props.color,
            transform: [
              { rotate: "45deg" },
              { translateX: markerTranslateX },
              { translateY: markerTranslateY },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.shadow,
          { transform: [{ scaleX: shadowScale }, { scaleY: shadowScale }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  marker: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    borderWidth: 15,
  },
  shadow: {
    position: "absolute",
    width: scale(8),
    height: 2,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default Loader;
