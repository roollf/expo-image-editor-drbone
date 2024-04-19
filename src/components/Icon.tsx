import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface IIconProps {
  disabled?: boolean;
  iconID: React.ComponentProps<typeof MaterialIcons>["name"];
  text: string;
}

export function Icon(props: IIconProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={props.iconID}
        size={26}
        // adição da cor referente ao onSurfaceVariant
        // original color white
        color={props.disabled ? "grey" : "#41484D"}
      />
      <Text style={[styles.text, props.disabled && { color: "grey" }]}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 80,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    // adição da cor referente ao onsurfaceVariant
    // original color #fff
    color: "#41484D",
    textAlign: "center",
    // adição de peso da fonte para melhor destacar o texto
    fontWeight: "700",
  },
});
