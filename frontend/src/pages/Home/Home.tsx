import React, { FormEvent, useEffect, useState } from "react";
import { useAppState } from "../Login/AuthProvider";
import { checkTokenToEndPoint, fetchLocalStorageUserName } from "../../functions/Auth";
import { useNavigate } from "react-router-dom";
import { AUTH_EXPIRE, AUTH_NG, AUTH_OK, LOGIN_OK, TOKEN_ID } from "../../const";
import { createMisstakeHistory, feachCause, feachClass } from "../../functions/Home/HomeFunc";
import { typeCauseMaster, typeClassMaster } from '../../types/db';
import Select from "react-select";
import { Button, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Loading from "../../components/Loading";
import { cleaLocalStorage } from '../../functions/Auth';
import { MyDivContainer } from "../../styles/styles";
import LoadingOverlay from 'react-loading-overlay-ts';

const Home: React.FC = () => {
    const navigate = useNavigate();
    // 自作フックを使用して LoginProvider から state と dispatch を取得
    const { state, dispatch } = useAppState();

    // LoginProvider で提供される state のプロパティを参照
    const { userName } = state;

    const [causeList, setCauseList] = useState<typeCauseMaster[]>([]);
    const [classList, setClassList] = useState<typeClassMaster[]>([]);
    const [selectedCause, setSelectedCause] = useState<typeCauseMaster>();
    const [selectedClass, setSelectedClass] = useState<typeClassMaster>();
    const [inputContents, setInputContents] = useState<string>('');
    const [inputPlan, setInputPlan] = useState<string>('');

    const [loadingFlg, setLoadingFlg] = useState<boolean>(false);

    useEffect(() => {
        setLoadingFlg(true); // ロード中表示
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
                    setLoadingFlg(false); // ロード中非表示
                    alert("セッションがタイムアウトしています。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                case responseForFetchCause['status'] === AUTH_NG:
                    // トークンに問題あり
                    setLoadingFlg(false); // ロード中非表示
                    alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                default:
                    setLoadingFlg(false); // ロード中非表示
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
                    setLoadingFlg(false); // ロード中非表示
                    setClassList(responseForFetchClass['classList'] as typeClassMaster[]);
                    break;
                case responseForFetchClass['status'] === AUTH_EXPIRE:
                    // セッションタイムアウト
                    setLoadingFlg(false); // ロード中非表示
                    alert("セッションがタイムアウトしています。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                case responseForFetchClass['status'] === AUTH_NG:
                    // トークンに問題あり
                    setLoadingFlg(false); // ロード中非表示
                    alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                default:
                    setLoadingFlg(false); // ロード中非表示
                    alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    return false;
            }

            // const response = await checkTokenToEndPoint();
            // console.log(response);
            // switch (true) {
            //     case response['status'] === AUTH_EXPIRE:
            //         // セッションタイムアウト
            //         alert("セッションがタイムアウトしています。再度ログインしてください。");
            //         localStorage.removeItem(TOKEN_ID);
            //         navigate("/");
            //         break;
            //     case response['status'] === AUTH_OK:
            //         // 問題なし
            //         console.log('OK');
            //         break;
            //     case response['status'] === AUTH_NG:
            //         // トークンに問題あり
            //         alert("ユーザー情報の検証が失敗しました。再度ログインしてください。");
            //         localStorage.removeItem(TOKEN_ID);
            //         navigate("/");
            //         break;
            //     default:
            //         alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
            //         localStorage.removeItem(TOKEN_ID);
            //         navigate("/");
            //         break;
            // }
        })();

    }, []);


    const handleSubmission = async () => {

        if (!selectedClass || !selectedCause) {
            alert("分類または原因が選択されていません。");
            return false;
        }

        setLoadingFlg(true); // ロード中表示

        // ミスを登録
        const response = await createMisstakeHistory(selectedClass.value, selectedCause.value, inputContents, inputPlan);
        console.log(response);
        switch (true) {
            case response['status'] === "OK":
                // 処理成功
                setInputContents("");
                setInputPlan("");
                setLoadingFlg(false); // ロード中非表示
                alert("ミスを登録しました。");
                break;
            default:
                // 通信エラー
                setLoadingFlg(false); // ロード中表示
                alert("ネットワークエラーが発生しました。時間を空けて再度試行してください。");
                return false;
        }
    };

    /**
     * ログアウト
     */
    const handleLogout = () => {
        cleaLocalStorage();
        if (window.confirm("ログアウトします。よろしいですか？")) {
            // ログイン画面に遷移
            navigate("/");
        }
        return false;
    };

    return (
        <LoadingOverlay
            active={loadingFlg}
            spinner={true}
            text='読み込み中...'
        >
            <MyDivContainer>
                <div style={{ marginBottom: '20px' }}>
                    ようこそ、{fetchLocalStorageUserName()}さん
                </div>
                <div>
                    <Button
                        variant="outlined"
                        onClick={handleLogout}
                        endIcon={<LogoutIcon />}
                    >ログアウト</Button>
                </div>
                <h3>ミスを入力してください。</h3>
                <div style={{ marginBottom: '20px' }}>
                    <Select
                        name="class"
                        placeholder="分類を選択してください。"
                        options={classList}
                        onChange={(value) => {
                            if (value) {
                                setSelectedClass(value);
                            }
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Select
                        name="cause"
                        placeholder="原因を選択してください。"
                        options={causeList}
                        onChange={(value) => {
                            if (value) {
                                setSelectedCause(value);
                            }
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        style={{ width: '100%', marginBottom: '10px' }}
                        onChange={e => setInputContents(e.target.value)}
                        value={inputContents}
                        placeholder="内容を入力してください。"
                        multiline
                        rows={3}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        style={{ width: '100%', marginBottom: '10px' }}
                        onChange={e => setInputPlan(e.target.value)}
                        value={inputPlan}
                        placeholder="対策を入力してください。"
                        multiline
                        rows={3}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={handleSubmission}
                        endIcon={<CheckCircleIcon />}
                    >提出</Button>
                </div>
            </MyDivContainer>
        </LoadingOverlay>
    );
}

export default Home;