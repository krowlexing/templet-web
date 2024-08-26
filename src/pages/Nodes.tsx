import { IconButton } from "@mui/material";
import { Node } from "../components/Node";
import { NodeData } from "../data/node";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store";
// import { createNode } from "../store/network";

interface Props {
    nodes?: NodeData[];
}

export function Nodes(props: Props) {
    const { nodes: defaultNodes } = props;

    const nodes = useAppSelector(state => state.nodes);
    const dispatch = useAppDispatch();

    if (!nodes) {
        return;
    }

    const nodeComponents = nodes.map(node => <Node node={node} />);
    return (
        <div>
            {/* <IconButton color="primary" onClick={() => dispatch(createNode())}>
                <Add />
                Добавить узел
            </IconButton> */}
            <div>
                <h1>Nodes</h1>
                {nodeComponents}
            </div>
        </div>
    );
}
