import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface IIconProps {
  disabled?: boolean;
  iconID: React.ComponentProps<typeof MaterialIcons>["name"];
  text: string;
  iconSize?: number;
  iconColor?: string;
}

// adicionada novas propriedades referentes a estilização dos ícones (iconSize, iconColor)

export function Icon(props: IIconProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={props.iconID}
        // adição da propriedade iconSize
        size={props.iconSize ? props.iconSize : 26}
        // adição da cor referente ao onSurfaceVariant
        // original color white
        color={props.iconColor ? props.iconColor : "#41484D"}
      />
      {/* comentado trecho do código que não será mais utilizado na aplicação */}
      {/* <Text style={[styles.text, props.disabled && { color: "grey" }]}>
        {props.text}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // retirada das propriedades height e width
    // height: 64,
    // width: 80,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    // comentado estilização que não será mais utilizada na aplicação
    // adição da cor referente ao onsurfaceVariant
    // original color #fff
    // color: "#41484D",
    // textAlign: "center",
    // adição de peso da fonte para melhor destacar o texto
    // fontWeight: "700",
  },
});
