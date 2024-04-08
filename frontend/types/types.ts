/**
 * バックエンドに送信するリクエスト型
 */
export type typeSendData = {
    method: string;
    headers: {
        'Content-Type': string,
    },
    body: string,
}