import { useNavigate, useLocation } from "react-router-dom";
import { MenuItem } from "./styles";
import { Divider } from "@mui/material";

export type MenuItemDefinition = {
    label: string;
    selected?: boolean;
    before?: () => boolean;
} & (
    | { navigation?: string }
    | {
          action?: () => void;
      }
);

type Props = {
    items: MenuItemDefinition[];
    selected: string;
};

export function SideMenu(props: Props) {
    const { items, selected } = props;

    const nav = useNavigate();
    const loc = useLocation();

    const itemComps = items.map((item, i) => (
        <MenuItem
            key={item.label}
            selected={item.label === selected}
            onClick={() => {
                if (item.before && !item.before()) {
                    return;
                }
                if ("navigation" in item && item.navigation) {
                    nav(item.navigation);
                } else if ("action" in item && item.action) {
                    item.action();
                }
            }}
        >
            {item.label}
        </MenuItem>
    ));

    return (
        <div>
            <div>Menu Header</div>
            <Divider sx={{ margin: "0 0 10px" }} />
            {itemComps}
        </div>
    );
}
