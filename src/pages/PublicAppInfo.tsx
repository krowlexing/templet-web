import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { thunks, useAppDispatch, useAppSelector } from "../store";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
} from "@mui/material";
import { Header } from "../components/styles";

export function PublicAppInfo() {
    const { appId } = useParams<{ appId: string }>();

    const dispath = useAppDispatch();
    const appInfo = useAppSelector(state => state.apps.appInfo);
    const navigate = useNavigate();

    useEffect(() => {
        if (appId) {
            dispath(thunks.apps.appInfo(+appId));
        }
    }, [dispath, appId]);

    if (appInfo.status != "fulfilled") {
        return <div>:(</div>;
    }

    const {
        title,
        author_id: owner,
        stopped,
        id,
        description,
        weblink,
        public: isPublic,
    } = appInfo.value;
    return (
        <Paper sx={{ padding: 2 }}>
            <Container>
                <Header>{title}</Header>
                <Text>owner: {owner}</Text>
                <Text>id: {id}</Text>
                <Text>description: {description}</Text>

                <Text>weblink: {weblink}</Text>
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
            </Container>

            <Button variant="contained" onClick={() => navigate("info")}>
                Edit
            </Button>
        </Paper>
    );
}

const Container = styled.div();
const Text = styled.div();
