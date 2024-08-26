import { Operator as OperatorData } from "../../data/operator";
import { Operator } from "./Operator";

interface Props {
    operators: OperatorData[];
    onEnd?: () => void;
}

export function Operators(props: Props) {
    const { operators } = props;

    const comps = operators.map(op => <Operator operator={op} />);
    return <div>{comps}</div>;
}
