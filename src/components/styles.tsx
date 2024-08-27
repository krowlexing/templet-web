import styled from "@emotion/styled";
import {
    Button,
    ButtonProps,
    IconButton,
    IconButtonProps,
    TextField,
    TextFieldProps,
} from "@mui/material";
import { forwardRef } from "react";
import { ReactRef } from "../pages/Registration";

export const colors = {
    primary: "#3F51B5",
    accent: "#FF5722",
    secondary: "#757575",
    background: "#FFFFFF",
} as const;

export const Header = styled.div({
    color: colors.primary,
    fontSize: 16,
    fontFamily: "inter",
});

const CustomTextField = forwardRef((props: TextFieldProps, ref: ReactRef) => (
    <TextField sx={{ width: "100%" }} size="small" {...props} inputRef={ref} />
));

const CustomButton = (props: ButtonProps) => (
    <Button size="small" variant="contained" {...props} />
);

export { CustomTextField as TextField, CustomButton as Button };

export const Header1 = styled.div({
    fontFamily: "Inter",
    fontSize: 24,
});

export const Text = styled.div({
    color: colors.secondary,
    fontSize: 14,
});

export const ContainedIconButton = (
    props: IconButtonProps & { variant?: string }
) => {
    let additionalStyle;
    if (props.variant) {
        additionalStyle = {
            backgroundColor: colors.primary,
            color: colors.background,
            borderRadius: 1,
            ":hover": {
                backgroundColor: colors.accent,
            },
        };
    }

    return <IconButton {...props} sx={{ ...additionalStyle, ...props.sx }} />;
};
