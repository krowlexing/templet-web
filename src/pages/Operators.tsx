import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { menu, templetMenu } from "../data/menu";
import { Operators as OperatorList } from "../components/Operators/Operators";
import { sampleOperators } from "../sample/operators";
import { Divider, Paper } from "@mui/material";
import { Button, Header1 } from "../components/styles";
import { OperatorForm } from "../components/Operators/OperatorForm";

export function Operators() {
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
                    <OperatorList operators={sampleOperators} />
                </Paper>
            }
        />
    );
}
