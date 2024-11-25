import styled from "@emotion/styled";
import { Accordion, AccordionProps } from "@mui/material";

export const Container = styled.div({
    backgroundColor: "#031b4d",
    width: 200,
    height: "100%",
    color: "white",
    padding: 5,
    textAlign: "left",
});

export const MenuBlock = styled.div({
    padding: "0.2rem",
    paddingLeft: 10,
    paddingRight: 10,
});

export const WhiteDivider = styled.div({
    height: 1,
    backgroundColor: "white",
});

export const MenuAccordion = (props: AccordionProps) => (
    <Accordion
        sx={{
            backgroundColor: "#031b4d",
            color: "white",
            padding: 0,
            margin: 0,
            minHeight: 0,
        }}
        elevation={0}
        defaultExpanded
        disableGutters
        {...props}
    />
);
