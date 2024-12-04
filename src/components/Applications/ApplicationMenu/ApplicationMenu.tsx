import { Column, Txt } from "../../CommonComponents";

type Route = "users" | "brokers" | "apisubdomain" | "tags" | "delete";

interface Props {
    selected: string;
    onClick: (route: string) => void;
}

/**
 *  Submenu to control an instance of 'Application'
 *
 */
export function ApplicationMenu(props: Props) {
    const { selected, onClick } = props;
    const routes: Route[] = [
        "users",
        "brokers",
        "apisubdomain",
        "tags",
        "delete",
    ];
    const items = ["Users", "Brokers", "API Subdomain", "Tags", "Delete"];

    const selectedSx = { color: "blue" };
    return (
        <Column minWidth={150} alignSelf={"flex-start"}>
            {items.map((item, i) => (
                <Txt
                    fontSize={18}
                    sx={item == selected ? selectedSx : undefined}
                    onClick={() => onClick(routes[i])}
                >
                    {item}
                </Txt>
            ))}
        </Column>
    );
}
