import React, { FormEvent } from 'react';
import { useAppState } from './AuthProvider';
import InputLoginInfo from '../../features/Login/InputLoginInfo'
import { feachLoginInfo } from '../../functions/Login/LoginFunc';
import { setToken } from '../../functions/Auth';
import { useNavigate } from "react-router-dom";
import { LOGIN_NG, LOGIN_OK } from '../../const';

const Login: React.FC = () => {
    const navigate = useNavigate();
    // 自作フックを使用して ChatProvider から state と dispatch を取得
    const { state, dispatch } = useAppState();

    // LoginProvider で提供される state のプロパティを参照
    const { userName, password } = state;

    /**
     * ログイン処理
     * @param event 
     */
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (userName.length === 0) {
            alert("ユーザー名が入力されていません。");
            return false;
        }
        else if (password.length === 0) {
            alert("パスワードが入力されていません。");
            return false;
        }

        // ログイン処理
        const response = await feachLoginInfo(userName, password);
        console.log(response);
        console.log(userName);
        switch (true) {
            case response['status'] === LOGIN_OK && 'token' in response && response['token'] !== undefined:
                // ログイン成功
                setToken(response['token'] as string);
                navigate("/home");
                break;
            case response['status'] === LOGIN_NG:
                // ログイン情報が間違っている
                alert("ユーザー名またはパスワードが違います。");
                return false;
            default:
                // 通信エラー
                alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                return false;
        }
    }

    return (
        <div>
            <InputLoginInfo handleLogin={handleLogin} />
        </div>
    );
}

export default Login;