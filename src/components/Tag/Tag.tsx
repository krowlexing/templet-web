import { Typography } from "@mui/material";

interface Props {
    value: string;
}

export function Tag(props: Props) {
    return (
        <Typography
            component="span"
            sx={{
                backgroundColor: "#DDD",
                fontWeight: 100,
                borderRadius: 1.5,
                padding: 1,
                paddingBottom: 0.5,
                paddingTop: 0.7,
            }}
        >
            {props.value}
        </Typography>
    );
}
