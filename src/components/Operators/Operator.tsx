import { Button } from "@mui/material";
import { Operator as OperatorData } from "../../data/operator";
import styled from "@emotion/styled";
import { colors } from "../styles";

interface Props {
    operator: OperatorData;
}

export function Operator(props: Props) {
    const { userId, username } = props.operator;

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {username} - {userId}
            </div>
            <div>
                <Button variant="contained">Delete</Button>
            </div>
        </Container>
    );
}

const Container = styled.div({
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid " + colors.secondary,
    padding: 5,
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 5,
});
