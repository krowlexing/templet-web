import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { sampleOperators } from "../sample/operators";
import { Button, Paper } from "@mui/material";
import { Header1 } from "../components/styles";
import { AppData } from "../data/app";
import { App } from "./App";

type Props = {
    app: AppData;
};

export function AppInfo(props: Props) {
    const { title } = props.app;
    return (
        <Skeleton
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.info.label} />
            }
            main={
                <Paper sx={{ padding: 2 }}>
                    <App data={props.app} />
                </Paper>
            }
        />
    );
}
