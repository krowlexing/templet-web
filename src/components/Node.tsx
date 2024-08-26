import { NodeData } from "../data/node";

interface Props {
    node: NodeData;
}

export function Node(props: Props) {
    const { node } = props;
    const { name, description, token, uuid } = node;
    return (
        <div>
            <p>I'm node</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{token}</p>
            <p>{uuid}</p>
        </div>
    );
}
