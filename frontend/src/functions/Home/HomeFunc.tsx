import { typeCauseMaster, typeCategoryMaster } from "../../types/db";
import { typeSendData } from "../../types/types";
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
export const feachCategory = async (): Promise<{ "status": string, "categoryList"?: typeCategoryMaster[] }> => {
    console.log('▼----- Start HomeFunction feachCategory -----▼');
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
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/category/fetchcategory', sendData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish HomeFunction feachCategory -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error HomeFunction feachCategory -----▲');
        return { 'status': AXIOS_ERROR };
    }
}

/**
 * ミス履歴を登録
 * 
 * @returns 
 */
export const createMistakeHistory = async (
    categoryId: number,
    causeId: number,
    contents: string,
    plan: string
): Promise<{ "status": string }> => {
    console.log('▼----- Start HomeFunction createMistakeHistory -----▼');
    try {
        // postで送るデータ
        const sendData: typeSendData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_id: categoryId,
                cause_id: causeId,
                contents: contents,
                plan: plan
            }),
        };

        // エンドポイントにリクエスト送信
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/mistakehistory/create', sendData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish HomeFunction createMistakeHistory -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error HomeFunction createMistakeHistory -----▲');
        return { 'status': AXIOS_ERROR };
    }
}