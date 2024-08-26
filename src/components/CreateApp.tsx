import { Checkbox } from "@mui/material";
import { Button, TextField } from "./styles";

type Props = {
    onSubmit: () => void;
    onCancel: () => void;
};

export function CreateApp(props: Props) {
    return (
        <>
            <table>
                <tr>
                    <td>owner</td>
                    <td>$username</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <TextField />
                    </td>
                </tr>
                <tr>
                    <td>weblink</td>
                    <td>
                        <TextField />
                    </td>
                </tr>
                <tr>
                    <td>Public</td>
                    <td>
                        <Checkbox />
                    </td>
                </tr>
                <tr>
                    <td>Stopped</td>
                    <td>
                        <Checkbox />
                    </td>
                </tr>
            </table>
            <div>
                <Button onClick={props.onSubmit}>Create</Button>
                <Button onClick={props.onCancel}>Cancel</Button>
            </div>
        </>
    );
}
