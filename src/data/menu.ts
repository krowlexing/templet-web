import { MenuItemDefinition } from "../components/Menu/SideMenu";

export const menu = {
    info: { label: "Информация", navigation: "../info" },
    operators: { label: "операторы", navigation: "../operators" },
    brokers: { label: "брокеры", navigation: "../brokers" },
    users: { label: "пользователи", navigation: "../users" },
};

export const templetMenu: MenuItemDefinition[] = [
    menu.info,
    menu.operators,
    menu.brokers,
    menu.users,
];
