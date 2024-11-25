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
import { ForwardedRef, forwardRef } from "react";

import { useNavigate } from "react-router";

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
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<RegistrationForm>();

    if (localStorage.getItem("token") != null) {
        navigate("../apps");
    }

    const onSubmit = (form: RegistrationForm) => {
        const { name, username, password } = form;
        network
            .register({ name, username, password })
            .then(data => {
                network.setToken(data.data);
                navigate("../apps");
            })
            .catch(e => console.log(e));
    };

    const goToLogin = () => navigate("../login");
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

                        <Button type="button" onClick={goToLogin}>
                            Уже есть аккаунт?
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
