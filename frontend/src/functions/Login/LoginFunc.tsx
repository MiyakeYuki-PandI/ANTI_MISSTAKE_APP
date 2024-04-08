import { typeSendData } from '../../../types/types';
import { AXIOS_ERROR } from '../../const';

/**
 * ログイン処理
 * 
 * @param userName ユーザー名
 * @param password パスワード
 * @returns status<>ERROR：通信成功、status==ERROR：通信エラー
 */
export const feachLoginInfo = async (
    userName: string,
    password: string
): Promise<{ "status": string, "token"?: string }> => {
    console.log('▼----- Start LoginFunction feachLoginInfo -----▼');
    console.log('Input', JSON.stringify({ userName: userName, password: password }));
    try {
        // postで送るデータ
        const sendData: typeSendData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: userName, password: password }),
        };

        // エンドポイントにリクエスト送信
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER_URL + '/auth/login', sendData);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 回答の取得
        console.log('▲----- Finish ChatGptFunction feachLoginInfo -----▲');
        return await response.json();

    } catch (error) {
        if (error === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error('Fetch error:', error);
        }
        console.log('▲----- Error ChatGptFunction feachLoginInfo -----▲');
        return { 'status': AXIOS_ERROR };
    }
}