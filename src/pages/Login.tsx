import {
    Button,
    Paper,
    TextField,
    TextFieldProps,
    Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { network } from "../network/network";
import { ForwardedRef, forwardRef, useCallback } from "react";

import { useNavigate } from "react-router";

interface LoginForm {
    username: string;
    password: string;
}

interface Props {
    onCreateAccount?: () => void;
}

export function Login(props: Props) {
    const { onCreateAccount } = props;
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginForm>();

    const onSubmit = (form: LoginForm) => {
        const { username, password } = form;
        network
            .login({ username, password })
            .then(data => {
                network.setToken(data.data);
                navigate("../apps");
            })
            .catch(e => console.log(e));
    };

    const goToRegister = useCallback(() => {
        navigate("../auth");
    }, [navigate]);

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
                                {...register("username")}
                                label="username"
                            />
                            <CustomTextField
                                {...register("password")}
                                label="пароль"
                            />
                        </InputContainer>

                        <Button variant="contained" type="submit">
                            Войти
                        </Button>

                        <Button type="button" onClick={goToRegister}>
                            Еще нет аккаунта?
                        </Button>
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
