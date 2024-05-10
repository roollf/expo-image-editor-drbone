import * as React from "react";
import { StyleSheet, View, Text, Platform, Alert } from "react-native";
import { useRecoilState } from "recoil";
import { IconButton } from "../components/IconButton";
import { editingModeState } from "../Store";
import { usePerformCrop } from "../customHooks/usePerformCrop";

export function Crop() {
  const [, setEditingMode] = useRecoilState(editingModeState);

  const onPerformCrop = usePerformCrop();

  return (
    <View style={styles.container}>
      <IconButton
        iconID="close"
        // adição da propriedade de iconSize para os ícones da aplicação
        iconSize={40}
        // modificação do texto da ação para Cancelar
        // original text Cancel
        text="Cancelar"
        onPress={() => setEditingMode("operation-select")}
      />
      {/* remoção do texto de apoio na tela de Crop */}
      {/* <Text style={styles.prompt}>Adjust window to crop</Text> */}
      <IconButton
        iconID="check"
        // adição da propriedade de iconSize para os ícones da aplicação
        iconSize={40}
        // modificação do texto da ação para Feito
        // original text Done
        text="Feito"
        onPress={onPerformCrop}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // alterado valor do paddingHorizontal
    // original value 2%
    paddingHorizontal: "20%",
    // adição do backgroundColor para a cor referente ao surfaceVariant
    backgroundColor: "#DDE3EA",
  },
  // comentado estilo prompt já que não está sendo utilizado
  // prompt: {
  //   color: "#fff",
  //   fontSize: 21,
  //   textAlign: "center",
  // },
});
