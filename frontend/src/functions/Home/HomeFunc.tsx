import { typeCauseMaster, typeClassMaster } from "../../../types/db";
import { typeSendData } from "../../../types/types";
import { AXIOS_ERROR, TOKEN_ID } from "../../const";

/**
 * 原因cmb値を取得する
 * 
 * @returns 
 */
export const feachCause = async (): Promise<{ "status": string, "causeList"?: typeCauseMaster[] }> => {
    console.log('▼----- Start HomeFunction feachCause -----▼');
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
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/cause/fetchcause', sendData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish HomeFunction feachCause -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error HomeFunction feachCause -----▲');
        return { 'status': AXIOS_ERROR };
    }
}

/**
 * 分類cmb値を取得する
 * 
 * @returns 
 */
export const feachClass = async (): Promise<{ "status": string, "classList"?: typeClassMaster[] }> => {
    console.log('▼----- Start HomeFunction feachClass -----▼');
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
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/class/fetchclass', sendData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish HomeFunction feachClass -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error HomeFunction feachClass -----▲');
        return { 'status': AXIOS_ERROR };
    }
}