import { BrokerParameter } from "../../../data/brokerConfiguration";
import { BooleanParameter } from "./BooleanParameter";
import { DropdownParameter } from "./DropdownParameter";
import { NumberParameter } from "./NumberParameter";

interface Props {
    param: BrokerParameter;
}

export function GenericParameter(props: Props) {
    const param = props.param;
    if (param.type == "number") {
        return <NumberParameter param={{ ...param, type: param.type }} />;
    } else if (param.type == "dropdown") {
        return <DropdownParameter param={{ ...param, type: param.type }} />;
    } else if (param.type == "boolean") {
        return <BooleanParameter param={{ ...param, type: param.type }} />;
    }
    return <div>:(</div>;
}
