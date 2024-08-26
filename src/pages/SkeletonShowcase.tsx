import { SideMenu } from "../components/Menu/SideMenu";
import { Skeleton } from "../components/Skeleton";
import { templetMenu, menu } from "../data/menu";
import { sampleApp } from "../sample/app";
import { App } from "./App";

interface Props {}

export function SkeletonShowcase(props: Props) {
    return (
        <Skeleton
            main={<App data={sampleApp} />}
            sidemenu={
                <SideMenu items={templetMenu} selected={menu.info.label} />
            }
        />
    );
}
