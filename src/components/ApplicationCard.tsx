import styled from "@emotion/styled";
import { noop } from "../utils";
import { Header, Text } from "./styles";

interface Props {
    id: number;
    title: string;
    description: string;

    onClick?: (id: number) => void;
}

export function ApplicationCard(props: Props) {
    const { id, title, description, onClick } = props;

    return (
        <Card onClick={onClick ? () => onClick(id) : noop}>
            <Header>{title}</Header>
            <Text>{description}</Text>
        </Card>
    );
}

const Card = styled.div({
    border: "1px solid #808080",
    padding: 10,
    margin: 5,
    borderRadius: 5,
});
