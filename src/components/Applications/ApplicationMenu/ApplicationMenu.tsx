import { Column, Txt } from "../../CommonComponents";

interface Props {
    selected: string;
}

/**
 *  Submenu to control an instance of 'Application'
 *
 */
export function ApplicationMenu(props: Props) {
    const { selected } = props;
    const items = ["Users", "Brokers", "API Subdomain", "Tags", "Delete"];

    const selectedSx = { color: "blue" };
    return (
        <Column minWidth={150} alignSelf={"flex-start"}>
            {items.map(item => (
                <Txt
                    fontSize={18}
                    sx={item == selected ? selectedSx : undefined}
                >
                    {item}
                </Txt>
            ))}
        </Column>
    );
}
