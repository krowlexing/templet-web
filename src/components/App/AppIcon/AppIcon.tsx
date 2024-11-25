import { Typography } from "@mui/material";

interface Props {}

export function AppIcon(props: Props) {
    return (
        <Typography
            component="div"
            sx={{
                backgroundColor: "lightblue",
                padding: 1,
                borderRadius: 10,
                marginRight: 1,
                height: 20,
                width: 20,
                background: "orange",
                textAlign: "center",
            }}
        >
            М
        </Typography>
    );
}
