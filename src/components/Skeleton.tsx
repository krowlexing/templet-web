import styled from "@emotion/styled";
import { TempletHeader } from "./TempletHeader";

interface Props {
    sidemenu: JSX.Element;
    main: JSX.Element;
}

export function Skeleton(props: Props) {
    return (
        <div>
            <TempletHeader />
            <Container>
                <SideMenuSpot>{props.sidemenu}</SideMenuSpot>
                <MainSpot>{props.main}</MainSpot>
            </Container>
        </div>
    );
}

const Container = styled.div({
    display: "flex",
    margin: 8,
});

const SideMenuSpot = styled.div({
    maxWidth: 200,
    width: "100%",
    marginRight: 10,
});

const MainSpot = styled.div({
    flexGrow: 1,
});
