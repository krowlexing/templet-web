import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Container, MenuAccordion, MenuBlock, WhiteDivider } from "./styles";
import styled from "@emotion/styled";

interface Props {}

export function AppSideMenu(props: Props) {
    return (
        <Container>
            <MenuBlock>
                <Text>Logo PaaS Name</Text>
            </MenuBlock>
            <WhiteDivider />
            <MenuBlock>
                <MenuAccordion>
                    <AccordionSummary sx={{ padding: 0, marginBottom: -1 }}>
                        <Text>MANAGE</Text>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ padding: 0, marginBottom: 0, marginTop: -1 }}
                    >
                        <Text>Applications</Text>
                        <Text>Application APIs</Text>
                        <Text>API Clients</Text>
                    </AccordionDetails>
                </MenuAccordion>
            </MenuBlock>
            <WhiteDivider />
            <MenuBlock>
                <Text>Billing</Text>
                <Text>Settings</Text>
                <Text>Support</Text>
            </MenuBlock>
            <WhiteDivider />
        </Container>
    );
}

const Text = styled(Typography)({
    padding: 9,
});
