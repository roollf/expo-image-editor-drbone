import * as React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
// importação dos elementos referentes a ControlBar (imageDataState, processingState)
import { editingModeState, imageDataState, processingState } from "../Store";
import { useRecoilState } from "recoil";
// importação dos elementos referentes a ControlBar (useEffect)
import { useContext, useEffect } from "react";
import {
  AdjustmentOperations,
  EditingOperations,
  EditorContext,
  TransformOperations,
} from "..";
import { useMemo } from "react";
// importação dos elementos referentes a ControlBar (usePerformCrop)
import { usePerformCrop } from "src/customHooks/usePerformCrop";

interface Operation<T> {
  title: string;
  iconID: React.ComponentProps<typeof Icon>["iconID"];
  operationID: T;
}

interface Operations {
  transform: Operation<TransformOperations>[];
  adjust: Operation<AdjustmentOperations>[];
}

const operations: Operations = {
  transform: [
    {
      // modificação do título da ação para Recortar
      // original title Crop
      title: "Recortar",
      iconID: "crop",
      operationID: "crop",
    },
    {
      // modificação do título da ação para Rotacionar
      // original title Rotate
      title: "Rotacionar",
      iconID: "rotate-90-degrees-ccw",
      operationID: "rotate",
    },
  ],
  adjust: [
    {
      title: "Blur",
      iconID: "blur-on",
      operationID: "blur",
    },
  ],
};

export function OperationSelection() {
  const { allowedTransformOperations, allowedAdjustmentOperations } =
    useContext(EditorContext);

  const isTransformOnly =
    allowedTransformOperations && !allowedAdjustmentOperations;
  const isAdjustmentOnly =
    allowedAdjustmentOperations && !allowedTransformOperations;

  const [selectedOperationGroup, setSelectedOperationGroup] = React.useState<
    "transform" | "adjust"
  >(isAdjustmentOnly ? "adjust" : "transform");

  const [, setEditingMode] = useRecoilState(editingModeState);

  const filteredOperations = useMemo(() => {
    // If neither are specified then allow the full range of operations
    if (!allowedTransformOperations && !allowedAdjustmentOperations) {
      return operations;
    }
    const filteredTransforms = allowedTransformOperations
      ? operations.transform.filter((op) =>
          allowedTransformOperations.includes(op.operationID)
        )
      : operations.transform;
    const filteredAdjustments = allowedAdjustmentOperations
      ? operations.adjust.filter((op) =>
          allowedAdjustmentOperations.includes(op.operationID)
        )
      : operations.adjust;
    if (isTransformOnly) {
      return { transform: filteredTransforms, adjust: [] };
    }
    if (isAdjustmentOnly) {
      return { adjust: filteredAdjustments, transform: [] };
    }
    return { transform: filteredTransforms, adjust: filteredAdjustments };
  }, [
    allowedTransformOperations,
    allowedAdjustmentOperations,
    isTransformOnly,
    isAdjustmentOnly,
  ]);

  // adição dos métodos da ControlBar para a tela de OperationSelect
  const [editingMode] = useRecoilState(editingModeState);
  const [imageData] = useRecoilState(imageDataState);
  const [processing, setProcessing] = useRecoilState(processingState);
  const { mode, onCloseEditor, onEditingComplete } = useContext(EditorContext);

  const performCrop = usePerformCrop();

  const onFinishEditing = async () => {
    if (mode === "full") {
      setProcessing(false);
      onEditingComplete(imageData);
      onCloseEditor();
    } else if (mode === "crop-only") {
      await performCrop();
    }
  };

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
      {/* modificação do style para contentContainerStyle */}
      <ScrollView contentContainerStyle={styles.opRow} horizontal>
        {
          //@ts-ignore
          filteredOperations[selectedOperationGroup].map(
            (item: Operation<EditingOperations>, index: number) => (
              <View style={styles.opContainer} key={item.title}>
                <IconButton
                  text={item.title}
                  iconID={item.iconID}
                  // adição da propriedade de iconSize para os ícones da aplicação
                  // iconSize={40}
                  onPress={() => setEditingMode(item.operationID)}
                />
              </View>
            )
          )
        }
        {/* adicionado trecho no código para refletir modificações do design */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 8,
              backgroundColor: "#1E6586",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              iconID="done"
              // adição da propriedade de iconSize para os ícones da aplicação
              iconSize={40}
              // adição da propriedade de iconColor para os ícones da aplicação
              iconColor="#FFFFFF"
              text="Feito"
              onPress={onFinishEditing}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* comentado trecho do código que não será mais utilizado na aplicação */}
      {/* {!isTransformOnly && !isAdjustmentOnly ? (
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              selectedOperationGroup === "transform" && {
                backgroundColor: "#333",
              },
            ]}
            onPress={() => setSelectedOperationGroup("transform")}
          >
            <Icon iconID="transform" text="Transform" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              selectedOperationGroup === "adjust" && {
                backgroundColor: "#333",
              },
            ]}
            onPress={() => setSelectedOperationGroup("adjust")}
          >
            <Icon iconID="tune" text="Adjust" />
          </TouchableOpacity>
        </View>
      ) : null} */}
    </>
  );
}

const styles = StyleSheet.create({
  opRow: {
    // alteração do height para 100% já que o style foi alterado para contentContainerStyle
    // original height value 80
    height: "100%",
    width: "100%",
    // adição do justifyContent como space-between
    justifyContent: "space-between",
    // adição da cor referente ao surfaceVariant
    // original color #333
    backgroundColor: "#DDE3EA",
    // adição da propriedade paddingHorizontal
    paddingHorizontal: 50
  },
  opContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // alteração do marginLeft para marginHorizontal
    // original property marginLeft
    // comentado propriedade marginHorizontal já que não será mais utilizada
    // marginHorizontal: 16,
  },
  modeRow: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modeButton: {
    height: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
});
