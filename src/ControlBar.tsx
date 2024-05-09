import * as React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { editingModeState, imageDataState, processingState } from "./Store";
import { IconButton } from "./components/IconButton";
import { useContext } from "react";
import { EditorContext } from "./index";
import { useEffect } from "react";
import { usePerformCrop } from "./customHooks/usePerformCrop";

function ControlBar() {
  const [editingMode, setEditingMode] = useRecoilState(editingModeState);
  const [imageData] = useRecoilState(imageDataState);
  const [processing, setProcessing] = useRecoilState(processingState);
  const { mode, onCloseEditor, onEditingComplete } = useContext(EditorContext);

  const performCrop = usePerformCrop();

  const shouldDisableDoneButton =
    editingMode !== "operation-select" && mode !== "crop-only";

  const onFinishEditing = async () => {
    if (mode === "full") {
      setProcessing(false);
      onEditingComplete(imageData);
      onCloseEditor();
    } else if (mode === "crop-only") {
      await performCrop();
    }
  };

  const onPressBack = () => {
    if (mode === "full") {
      if (editingMode === "operation-select") {
        onCloseEditor();
      } else {
        setEditingMode("operation-select");
      }
    } else if (mode === "crop-only") {
      onCloseEditor();
    }
  };

  // Complete the editing process if we are in crop only mode after the editingMode gets set
  // back to operation select (happens internally in usePerformCrop) - can't do it in onFinishEditing
  // else it gets stale state - may need to refactor the hook as this feels hacky
  useEffect(() => {
    if (
      mode === "crop-only" &&
      imageData.uri &&
      editingMode === "operation-select"
    ) {
      onEditingComplete(imageData);
      onCloseEditor();
    }
  }, [imageData, editingMode]);

  return (
    <>
    {/* comentado trecho do código que não será mais utilizado na aplicação */}
      {/* <View style={styles.container}>
        <IconButton
          iconID="arrow-back"
          // modificação do texto da ação para Voltar
          // original text Back
          text="Voltar"
          onPress={onPressBack}
        />
        <IconButton
          iconID="done"
          // modificação do texto da ação para Feito
          // original text Done
          text="Feito"
          onPress={onFinishEditing}
          disabled={shouldDisableDoneButton}
        />
      </View> */}
    </>
  );
}

export { ControlBar };

const styles = StyleSheet.create({
  container: {
    // comentado estilização que não será mais utilizada na aplicação
    // width: "100%",
    // height: 80,
    // // adição da cor referente ao surfaceVariant
    // // original color #333
    // backgroundColor: "#DDE3EA",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // paddingHorizontal: 4,
  },
});
