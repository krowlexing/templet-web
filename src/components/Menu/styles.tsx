import styled from "@emotion/styled";
import { colors } from "../styles";

export const MenuItemText = styled.div({
    fontFamily: "Inter",
    fontSize: 24,
});

/**
 * first style name is mangled and its disabled
 */
export const MenuItem = styled.div<{ selected: boolean }>(
    MenuItemText,
    {
        display: "block",
        borderLeftWidth: 10,
        borderLeftStyle: "solid",
        padding: "10px 10px 10px 10px",
    },
    props => ({
        borderLeftColor: props.selected ? colors.accent : colors.background,
        boxShadow: props.selected ? "0px 2px 4px #646464" : undefined,
    })
);
