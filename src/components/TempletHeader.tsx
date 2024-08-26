import { useNavigate } from "react-router";

interface Props {
    button?: JSX.Element;
}

export function TempletHeader(props: Props) {
    const nav = useNavigate();
    return (
        <div
            style={{
                height: 40,

                width: "100%",
                textAlign: "left",
                color: "white",
                verticalAlign: "center",
                display: "flex",
                alignItems: "center",

                justifyContent: "space-between",
                backgroundColor: "#1f1d1d",
                fontFamily: "Inter",
            }}
            onClick={() => nav("/test/apps")}
        >
            <span>Templet</span>
            <div>{props.button}</div>
        </div>
    );
}
