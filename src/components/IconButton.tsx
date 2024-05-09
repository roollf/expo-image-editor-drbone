import * as React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon, IIconProps } from "./Icon";

type IIconButtonProps = IIconProps & TouchableOpacityProps;

// adicionada novas propriedades referentes a estilização dos ícones da aplicação (iconSize, iconColor)

export function IconButton(props: IIconButtonProps) {
  const { text, iconID, iconSize, iconColor, ...buttonProps } = props;
  const iconProps = { text, iconID, iconSize, iconColor, disabled: buttonProps.disabled };
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
}
