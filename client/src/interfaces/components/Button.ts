import { ButtonProps } from "antd";

export type ButtonWithIconProps = Omit<ButtonProps, 'children' | 'icon' | 'type'> & { showIcon?: boolean; minimal?: boolean };

export type ChangeVisibilityButtonProps = ButtonWithIconProps & { visilityState: boolean };
