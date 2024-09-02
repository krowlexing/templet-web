import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { sampleOperators } from "../sample/operators";
import { Button, Paper } from "@mui/material";
import { Header1 } from "../components/styles";
import { AppData } from "../data/app";
import { App } from "./App";
import { useParams } from "react-router";
import { useEffect } from "react";
import { thunks, useAppDispatch, useAppSelector } from "../store";

type Props = {
    x?: boolean;
};

export function AppInfo(props: Props) {
    const { appId } = useParams<{ appId: string }>();

    const dispath = useAppDispatch();
    const appInfo = useAppSelector(state => state.apps.appInfo);

    useEffect(() => {
        if (appId) {
            dispath(thunks.apps.appInfo(+appId));
        }
    }, [dispath, appId]);

    if (appInfo.status != "fulfilled") {
        return <div>:(</div>;
    }

    // console.dir(appInfo.value);
    // if (id && appInfo.value.id !== +id) {
    //     console.log(`
    //         expected id: ${+id}
    //         actual id: ${appInfo.value?.id}
    //         `);
    //     return null;
    // }

    return (
        <Skeleton
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.info.label} />
            }
            main={
                <Paper sx={{ padding: 2 }}>
                    <App data={appInfo.value} />
                </Paper>
            }
        />
    );
}
