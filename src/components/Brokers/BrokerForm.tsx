import { Button, Checkbox } from "@mui/material";
import { colors, TextField } from "../styles";
import { Check } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { network } from "../../network/network";

interface Props {
    onCreate: (broker: BrokerFormData) => void;
    onCancel: () => void;
}

interface BrokerFormData {
    name: string;
    description: string;
    stopped: boolean;
}

export function BrokerForm(props: Props) {
    const { onCancel, onCreate } = props;

    const { register, handleSubmit } = useForm<BrokerFormData>();

    return (
        <div style={{ fontFamily: "inter" }}>
            <form onSubmit={handleSubmit(onCreate)}>
                <div>
                    <table>
                        <tr>
                            <td>Название брокера</td>
                            <td>
                                <TextField
                                    placeholder="broker_name"
                                    size="small"
                                    {...register("name")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Описание</td>
                            <td style={{ width: "100%" }}>
                                <TextField {...register("description")} />
                            </td>
                        </tr>
                        <tr>
                            <td>Stopped</td>
                            <td>
                                <Checkbox {...register("stopped")} />
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <Button variant="contained" size="small" type="submit">
                        Create
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
