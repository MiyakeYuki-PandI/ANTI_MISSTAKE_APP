import React, { } from "react";
import {
    Navigate,
    useLocation
} from "react-router-dom";
import { typeSendData } from "../../types/types";
import { AXIOS_ERROR, TOKEN_ID } from "../const";

export const setToken = (token: string) => {
    // set token in localStorage
    localStorage.setItem(TOKEN_ID, token)
}
export const fetchToken = () => {
    // fetch the token
    return localStorage.getItem(TOKEN_ID)
}

type RequireTokenProps = {
    children: React.ReactNode;
};
export const RequireToken: React.FC<RequireTokenProps> = ({ children }) => {

    let auth = fetchToken()
    let location = useLocation();

    if (!auth) {

        return <Navigate to="/" state={{ from: location }} />;
    }

    return <>{children}</>;
}

/**
 * トークンの検証(ローカルストレージのトークン参照)
 * 
 * @returns status<>ERROR：通信成功、status==ERROR：通信エラー
 */
export const checkTokenToEndPoint = async (): Promise<{ "status": string }> => {
    console.log('▼----- Start LoginFunction checkToken -----▼');
    console.log('Input:', JSON.stringify({ token: localStorage.getItem(TOKEN_ID) }));
    try {
        // postで送るデータ
        const sendData: typeSendData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem(TOKEN_ID) }),
        };

        // エンドポイントにリクエスト送信
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/auth/checktoken', sendData);
        console.log(response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish ChatGptFunction checkToken -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error ChatGptFunction checkToken -----▲');
        return { "status": AXIOS_ERROR };
    }
}