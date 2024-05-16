import React, { FormEvent, useState } from 'react';
import { useAppState } from './AuthProvider';
import InputLoginInfo from '../../features/Login/InputLoginInfo'
import { feachLoginInfo } from '../../functions/Login/LoginFunc';
import { setLocalStorageToken, setLocalStorageUserName } from '../../functions/Auth';
import { useNavigate } from "react-router-dom";
import { MyDivContainer } from '../../styles/styles';
import { LOGIN_NG, LOGIN_OK } from '../../const';
import LoadingOverlay from 'react-loading-overlay-ts';

const Login: React.FC = () => {
    const navigate = useNavigate();
    // 自作フックを使用して ChatProvider から state と dispatch を取得
    const { state, dispatch } = useAppState();

    // LoginProvider で提供される state のプロパティを参照
    const { userName, password } = state;
    const setUserName = (userName: string) => dispatch({ type: 'setUserName', payload: userName });
    const setPassword = (password: string) => dispatch({ type: 'setPassword', payload: password });

    // ロード中表示フラグ
    const [loadingFlg, setLoadingFlg] = useState<boolean>(false);

    /**
     * ログイン処理
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

        setLoadingFlg(true);

        // ログイン処理
        const response = await feachLoginInfo(userName, password);
        console.log(response);
        console.log(userName);
        switch (true) {
            case response['status'] === LOGIN_OK && 'token' in response && response['token'] !== undefined:
                // ログイン成功
                setLocalStorageToken(response['token'] as string); // ローカルストレージ.トークンを更新
                setLocalStorageUserName(userName); // ローカルストレージ.ユーザー名を更新

                setUserName(""); // ユーザー名入力欄をクリア
                setPassword(""); // パスワード入力欄をクリア

                setLoadingFlg(false); // ロード中非表示

                navigate("/home");
                break;
            case response['status'] === LOGIN_NG:
                // ログイン情報が間違っている
                setLoadingFlg(false);
                alert("ユーザー名またはパスワードが違います。");
                return false;
            default:
                // 通信エラー
                setLoadingFlg(false);
                alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                return false;
        }
    }

    return (
        <LoadingOverlay
            active={loadingFlg}
            spinner={true}
            text='読み込み中...'
        >
            <MyDivContainer>
                <InputLoginInfo handleLogin={handleLogin} />
            </MyDivContainer>
        </LoadingOverlay>
    );
}

export default Login;