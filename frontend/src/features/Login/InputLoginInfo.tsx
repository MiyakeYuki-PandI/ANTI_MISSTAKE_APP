import React, { FormEventHandler } from "react";
import { useAppState } from '../../pages/Login/AuthProvider';

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
            <label>
                ユーザー名:
                <input type="text"
                    value={userName}
                    onChange={(e) => {
                        e.preventDefault();
                        setUserName(e.target.value);
                    }} />
            </label><br />
            <label>
                パスワード:
                <input type="text"
                    value={password}
                    onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                    }} />
            </label><br />
            <input type="submit" value="ログイン" />
        </form>
    );
};

export default InputLoginInfo;