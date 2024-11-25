import { ReactNode } from "react";
import { AppSideMenu } from "./AppSideMenu";
import { AppTopMenu } from "./AppTopMenu/AppTopMenu";

interface Props {
    children?: ReactNode[] | ReactNode;
}

export function AppSkeleton(props: Props) {
    const children = props.children;

    return (
        <div style={{ height: "100%", display: "flex" }}>
            <div style={{ display: "flex", flexGrow: 1 }}>
                <AppSideMenu />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        maxHeight: 50,
                        minHeight: 50,
                    }}
                >
                    <AppTopMenu />
                    <div
                        style={{
                            display: "flex",
                            flexGrow: 1,
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ maxWidth: "1000px", flex: 1 }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
