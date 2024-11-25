import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { Divider, Paper } from "@mui/material";
import { Button, Header1 } from "../components/styles";
import { useEffect, useState } from "react";
import { network } from "../network/network";
import { useParams } from "react-router";
import { Operator } from "../data/operator";
import { SearchWithButton } from "../components/SearchWithButton";
import { cancellablePromise } from "../network-helper-lib/cancellable";

export function Users() {
    const [operators, setOperators] = useState<Operator[]>();
    const [selectedUser, setSelectedUser] = useState(-1);
    const appId = +useParams<{ appId: string }>().appId!;

    const requestOperators = (appId: number) =>
        network.appUsers
            .all(appId)
            .then(res => res.data)
            .then(setOperators);

    const addAppUser = (userId: number) =>
        network.appUsers
            .create(appId, userId)
            .then(() => requestOperators(appId));

    const deleteAppUser = (userId: number) =>
        network.appUsers
            .delete(appId, userId)
            .then(() => requestOperators(appId));

    const search = cancellablePromise((query: string) => {
        return network.users.search(query).then(res => {
            console.log("received response");
            return res.data;
        });
    }, 600);

    useEffect(() => {
        requestOperators(appId);
    }, [appId]);

    if (operators == undefined) {
        return <div>:(</div>;
    }

    return (
        <Skeleton
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.users.label} />
            }
            main={
                <Paper sx={{ padding: 2 }}>
                    <Header1>Пользователи</Header1>
                    <Divider sx={{ margin: 1 }} />
                    <div
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        <SearchWithButton
                            search={search}
                            getLabel={user => user.username}
                            getKey={user => +user.id}
                            onSelect={setSelectedUser}
                            onUnselect={() => setSelectedUser(-1)}
                            onButtonClick={() => {
                                if (selectedUser != -1) {
                                    addAppUser(selectedUser);
                                }
                            }}
                        />
                        <div>
                            <Button>Import</Button>
                            <Button>Export</Button>
                        </div>
                    </div>

                    <Divider sx={{ margin: 1 }} />
                    <OperatorList
                        operators={operators}
                        onDelete={user => deleteAppUser(user.id)}
                    />
                </Paper>
            }
        />
    );
}
