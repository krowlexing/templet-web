import { Operator as OperatorData } from "../../data/operator";
import { Operator } from "./Operator";

interface Props {
    operators: OperatorData[];
    onDelete?: (operator: OperatorData) => void;
    onEnd?: () => void;
}

export function Operators(props: Props) {
    const { operators, onDelete } = props;

    const comps = operators.map(op => (
        <Operator operator={op} onDelete={onDelete} />
    ));
    return <div>{comps}</div>;
}
