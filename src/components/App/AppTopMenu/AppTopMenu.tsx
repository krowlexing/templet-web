import { App } from "../../../pages/App";
import { AppIcon } from "../AppIcon/AppIcon";
import { Container } from "./styles";

interface Props {}

export function AppTopMenu(props: Props) {
    return (
        <Container>
            <AppIcon />
        </Container>
    );
}
