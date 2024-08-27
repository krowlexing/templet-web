import { Checkbox } from "@mui/material";
import { Button, TextField } from "./styles";
import { useForm } from "react-hook-form";

type Props = {
    onSubmit: (data: AppForm) => void;
    onCancel: () => void;
};

type AppForm = {
    title: string;
    description: string;
    weblink: string;
    public: boolean;
    stopped: boolean;
};

export function CreateApp(props: Props) {
    const { register, handleSubmit } = useForm<AppForm>();
    const submit = (formData: AppForm) => {
        props.onSubmit(formData);
    };
    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <table>
                    <tr>
                        <td>owner</td>
                        <td>$username</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>
                            <TextField {...register("title")} />
                        </td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>
                            <TextField {...register("description")} />
                        </td>
                    </tr>
                    <tr>
                        <td>weblink</td>
                        <td>
                            <TextField {...register("weblink")} />
                        </td>
                    </tr>
                    <tr>
                        <td>Public</td>
                        <td>
                            <Checkbox {...register("public")} />
                        </td>
                    </tr>
                    <tr>
                        <td>Stopped</td>
                        <td>
                            <Checkbox {...register("stopped")} />
                        </td>
                    </tr>
                </table>
                <div>
                    <Button type="submit">Create</Button>
                    <Button onClick={props.onCancel}>Cancel</Button>
                </div>
            </form>
        </>
    );
}
