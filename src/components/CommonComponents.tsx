import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";

export const Row = (props: StackProps) => (
    <Stack direction="row" {...props} alignItems={"center"}></Stack>
);
export const Column = (props: StackProps) => (
    <Stack direction="column" {...props} />
);
export const Txt = (props: TypographyProps) => (
    <Typography sx={{ marginTop: 0.7 }} {...props}>
        {props.children}
    </Typography>
);
