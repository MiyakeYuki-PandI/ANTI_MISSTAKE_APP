import React, { } from "react";
import {
    Navigate,
    useLocation
} from "react-router-dom";
import { typeSendData } from "../types/types";
import { AXIOS_ERROR, TOKEN_ID, USER_NAME } from "../const";

export const setLocalStorageToken = (token: string) => {
    // set token in localStorage
    localStorage.setItem(TOKEN_ID, token);
};
export const fetchLocalStorageToken = () => {
    // fetch the token
    return localStorage.getItem(TOKEN_ID);
};

export const setLocalStorageUserName = (userName: string) => {
    // set userName in localStorage
    localStorage.setItem(USER_NAME, userName);
}
export const fetchLocalStorageUserName = () => {
    // fetch the userName
    return localStorage.getItem(USER_NAME);
}
/**
 * ローカルストレージのアイテム全削除
 */
export const cleaLocalStorage = () => {
    localStorage.clear();
};

type RequireTokenProps = {
    children: React.ReactNode;
};
export const RequireToken: React.FC<RequireTokenProps> = ({ children }) => {

    let auth = fetchLocalStorageToken()
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
    console.log('▼----- Start LoginFunction checkTokenToEndPoint -----▼');
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
        console.log('▲----- Finish ChatGptFunction checkTokenToEndPoint -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error ChatGptFunction checkTokenToEndPoint -----▲');
        return { "status": AXIOS_ERROR };
    }
}