import React, { FormEventHandler } from "react";
import { useAppState } from '../../pages/Login/AuthProvider';
import { Button, TextField } from "@mui/material";

export type typeLoginInfo = { userName: string; password: string; };

type InputLoginInfoProps = {
    handleLogin: FormEventHandler<HTMLFormElement>,
}

const InputLoginInfo: React.FC<InputLoginInfoProps> = ({
    handleLogin,
}) => {
    const { state, dispatch } = useAppState();
    const { userName, password } = state;
    const setUserName = (userName: string) => dispatch({ type: 'setUserName', payload: userName });
    const setPassword = (password: string) => dispatch({ type: 'setPassword', payload: password });

    return (
        <form onSubmit={handleLogin}>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth label="ユーザー名"
            onChange={(e) => {
                e.preventDefault();
                setUserName(e.target.value);
            }}
            value={userName}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth label="パスワード" type="password"
            onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
            }}
            value={password}
        />
        <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
        >
            ログイン
        </Button>
    </form>
    );
};

export default InputLoginInfo;