import { Button, Checkbox } from "@mui/material";
import { colors, TextField } from "../styles";
import { Check } from "@mui/icons-material";

interface Props {
    onCreate: () => void;
    onCancel: () => void;
}

export function BrokerForm(props: Props) {
    const { onCancel, onCreate } = props;
    return (
        <div style={{ fontFamily: "inter" }}>
            <div>
                <table>
                    <tr>
                        <td>Название брокера</td>
                        <td>
                            <TextField placeholder="broker_name" size="small" />
                        </td>
                    </tr>
                    <tr>
                        <td>Описание</td>
                        <td style={{ width: "100%" }}>
                            <TextField />
                        </td>
                    </tr>
                    <tr>
                        <td>Stopped</td>
                        <td>
                            <Checkbox />
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <Button variant="contained" size="small" onClick={onCreate}>
                    Create
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
