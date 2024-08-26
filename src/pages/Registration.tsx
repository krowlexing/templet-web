import {
    Button,
    Paper,
    TextField,
    TextFieldProps,
    Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import { noop } from "../utils";
import { useForm } from "react-hook-form";
import { register as registerRequest, login } from "../store/network";
import { ForwardedRef, forwardRef, Ref } from "react";

interface RegistrationForm {
    name: string;
    username: string;
    password: string;
    passwordRepeat: string;
}

interface Props {
    onCreateAccount?: () => void;
}

export function Registration(props: Props) {
    const { onCreateAccount } = props;
    const { register, handleSubmit } = useForm<RegistrationForm>();

    const onSubmit = (form: RegistrationForm) => {
        alert(JSON.stringify(form));
        const { name, username, password } = form;
        registerRequest(name, username, password)
            .then(token => alert(token))
            .catch(e => console.log(e));
    };

    // console.dir(reg);
    return (
        <Fullscreen>
            <Centered>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "min-content",
                        minWidth: "300px",
                        padding: "20px",
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            typography="h5"
                            sx={{ textAlign: "center" }}
                        >
                            Регистрация
                        </Typography>
                        <InputContainer>
                            <CustomTextField
                                {...register("name")}
                                label="Имя"
                            />

                            <CustomTextField
                                {...register("username")}
                                label="username"
                            />
                            <CustomTextField
                                {...register("password")}
                                label="пароль"
                            />
                            <CustomTextField
                                {...register("passwordRepeat")}
                                label="пароль еще раз"
                            />
                        </InputContainer>

                        <Button variant="contained" type="submit">
                            Создать аккаунт
                        </Button>

                        <Button>Уже есть аккаунт?</Button>
                    </form>
                </Paper>
            </Centered>
        </Fullscreen>
    );
}

interface Props {}

const Fullscreen = styled.div`
    height: 100vh;
    width: 100wh;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Centered = styled.div({
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export type ReactRef = ForwardedRef<HTMLDivElement>;

const SmallTextField = forwardRef(
    (props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) => {
        console.dir(props);

        return <TextField size="small" {...props} ref={ref} />;
    }
);

const CustomTextField = forwardRef((props: TextFieldProps, ref: ReactRef) => (
    <SmallTextField
        sx={{
            marginBottom: "5px",
            marginTop: "5px",
            size: "small",
        }}
        {...props}
        ref={ref}
    />
));

export function TextFieldWithLabel(_: Props) {
    return (
        <>
            <Typography>Имя</Typography>
            <TextField />
        </>
    );
}
