import React, { FormEvent, useEffect, useState } from "react";
import { useAppState } from "../Login/AuthProvider";
import { checkTokenToEndPoint } from "../../functions/Auth";
import { useNavigate } from "react-router-dom";
import { AUTH_EXPIRE, AUTH_NG, AUTH_OK, TOKEN_ID } from "../../const";
import { feachCause, feachClass } from "../../functions/Home/HomeFunc";
import { typeCauseMaster, typeClassMaster } from '../../../types/db';

const Home: React.FC = () => {
    const navigate = useNavigate();
    // 自作フックを使用して LoginProvider から state と dispatch を取得
    const { state, dispatch } = useAppState();

    // LoginProvider で提供される state のプロパティを参照
    const { userName } = state;

    const [causeList, setCauseList] = useState<typeCauseMaster[]>([]);
    const [classList, setClassList] = useState<typeClassMaster[]>([]);

    useEffect(() => {
        (async () => {
            // 原因マスタからレコードを全件取得
            const responseForFetchCause = await feachCause();
            console.log(responseForFetchCause);
            switch (true) {
                case responseForFetchCause['status'] === AUTH_OK && 'causeList' in responseForFetchCause && responseForFetchCause['causeList'] !== undefined:
                    // 取得成功
                    setCauseList(responseForFetchCause['causeList'] as typeCauseMaster[]);
                    break;
                case responseForFetchCause['status'] === AUTH_EXPIRE:
                    // セッションタイムアウト
                    alert("セッションがタイムアウトしています。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                case responseForFetchCause['status'] === AUTH_NG:
                    // トークンに問題あり
                    alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                default:
                    alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    return false;
            }

            // 分類マスタからレコードを全件取得
            const responseForFetchClass = await feachClass();
            console.log(responseForFetchClass);
            switch (true) {
                case responseForFetchClass['status'] === AUTH_OK && 'classList' in responseForFetchClass && responseForFetchClass['classList'] !== undefined:
                    // 取得成功
                    setClassList(responseForFetchClass['classList'] as typeClassMaster[]);
                    break;
                case responseForFetchClass['status'] === AUTH_EXPIRE:
                    // セッションタイムアウト
                    alert("セッションがタイムアウトしています。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                case responseForFetchClass['status'] === AUTH_NG:
                    // トークンに問題あり
                    alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                default:
                    alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    return false;
            }

        })();
    }, []);

    const checkToken = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // ログイン処理
        const response = await checkTokenToEndPoint();
        console.log(response);
        switch (true) {
            case response['status'] === AUTH_EXPIRE:
                // セッションタイムアウト
                alert("セッションがタイムアウトしています。再度ログインしてください。");
                localStorage.removeItem(TOKEN_ID);
                navigate("/");
                break;
            case response['status'] === AUTH_OK:
                // 問題なし
                console.log('OK');
                break;
            case response['status'] === AUTH_NG:
                // トークンに問題あり
                alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
                localStorage.removeItem(TOKEN_ID);
                navigate("/");
                break;
            default:
                alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                localStorage.removeItem(TOKEN_ID);
                navigate("/");
                break;
        }
    }
    return (
        <div>
            ようこそ、{userName}さん
            <h3>分類</h3>
            <ul>
                {classList.map(_class => (
                    <li key={_class.classId}>{_class.classId}、{_class.className}</li>
                ))}
            </ul>
            <h3>原因</h3>
            <ul>
                {causeList.map(cause => (
                    <li key={cause.causeId}>{cause.causeId}、{cause.causeName}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;