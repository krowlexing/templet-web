import styled from "@emotion/styled";
import { AppData } from "../data/app";
import { Header, Text } from "../components/styles";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from "@mui/material";
import { MenuItem } from "../components/Menu/styles";
import { SideMenu } from "../components/Menu/SideMenu";

interface Props {
    data: AppData;
}

export function App(props: Props) {
    const {
        author_id: owner,
        id,
        title,
        description,
        weblink,
        public: isPublic,
        stopped,
    } = props.data;

    return (
        <>
            <Container>
                <Header>{title}</Header>
                <Text>owner: {owner}</Text>
                <Text>id: {id}</Text>
                <div>
                    description:
                    <TextField defaultValue={description} />
                </div>
                weblink:
                <TextField defaultValue={weblink} />
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked={isPublic} />}
                        label="Public"
                    />
                    <FormControlLabel
                        required
                        control={<Checkbox defaultChecked={stopped} />}
                        label="Stopped"
                    />
                </FormGroup>
                <Button variant="contained">Submit</Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "orange",
                        color: "black",
                        ":hover": { backgroundColor: "red" },
                    }}
                >
                    Reset
                </Button>
            </Container>
        </>
    );
}

const Container = styled.div({
    border: "1px solid #808080",
    padding: 10,
});
