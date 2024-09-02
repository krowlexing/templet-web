import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { Divider, Paper } from "@mui/material";
import { Button, Header1 } from "../components/styles";
import { OperatorForm } from "../components/Operators/OperatorForm";
import { thunks, useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { useParams } from "react-router";
import { network } from "../network/network";
import { Operator as OperatorData } from "../data/operator";

export function Operators() {
    const operatorsRequest = useAppSelector(state => state.operators.all);
    const dispatch = useAppDispatch();

    const appId = +useParams<{ appId: string }>().appId!;
    useEffect(() => {
        dispatch(thunks.operators.all(appId));
    }, [dispatch, appId]);

    const requestDelete = (operator: OperatorData) =>
        network.operators
            .delete({ appId, operatorId: operator.id })
            .then(() => dispatch(thunks.operators.all(appId)));

    if (operatorsRequest.status != "fulfilled") {
        return <div>:(</div>;
    }
    return (
        <Skeleton
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.operators.label} />
            }
            main={
                <Paper sx={{ padding: 2 }}>
                    <Header1>Операторы</Header1>
                    <Divider sx={{ margin: 1 }} />
                    <div
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <OperatorForm />
                        <div>
                            <Button>Import</Button>
                            <Button>Export</Button>
                        </div>
                    </div>

                    <Divider sx={{ margin: 1 }} />
                    <OperatorList
                        operators={operatorsRequest.value}
                        onDelete={requestDelete}
                    />
                </Paper>
            }
        />
    );
}
