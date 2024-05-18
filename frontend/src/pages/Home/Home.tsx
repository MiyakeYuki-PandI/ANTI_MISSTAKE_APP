import React, { useEffect, useState } from "react";
import { checkTokenToEndPoint, fetchLocalStorageUserName } from "../../functions/Auth";
import { useNavigate } from "react-router-dom";
import { AUTH_EXPIRE, AUTH_NG, AUTH_OK, LOGIN_OK, TOKEN_ID } from "../../const";
import { createMistakeHistory as createMistakeHistory, feachCause, feachCategory } from "../../functions/Home/HomeFunc";
import { typeCauseMaster, typeCategoryMaster } from '../../types/db';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Divider
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { cleaLocalStorage } from '../../functions/Auth';
import { MyDivContainer } from "../../styles/styles";
import LoadingOverlay from 'react-loading-overlay-ts';


const Home: React.FC = () => {
    const navigate = useNavigate();

    const [causeList, setCauseList] = useState<typeCauseMaster[]>([]);
    const [categoryList, setCategoryList] = useState<typeCategoryMaster[]>([]);

    const [selectedCauseId, setSelectedCauseId] = useState<number>();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

    const [inputContents, setInputContents] = useState<string>('');
    const [inputPlan, setInputPlan] = useState<string>('');

    // ロード中フラグ(ロード中：true)
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
            const responseForFetchCategory = await feachCategory();
            console.log(responseForFetchCategory);
            switch (true) {
                case responseForFetchCategory['status'] === AUTH_OK && 'categoryList' in responseForFetchCategory && responseForFetchCategory['categoryList'] !== undefined:
                    // 取得成功
                    setLoadingFlg(false); // ロード中非表示
                    setCategoryList(responseForFetchCategory['categoryList'] as typeCategoryMaster[]);
                    break;
                case responseForFetchCategory['status'] === AUTH_EXPIRE:
                    // セッションタイムアウト
                    setLoadingFlg(false); // ロード中非表示
                    alert("セッションがタイムアウトしています。再度ログインしてください。");
                    localStorage.removeItem(TOKEN_ID);
                    navigate("/");
                    break;
                case responseForFetchCategory['status'] === AUTH_NG:
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


    /**
     * ミス登録処理
     */
    const handleSubmission = async () => {

        if (!selectedCategoryId || !selectedCauseId) {
            alert("分類または原因が選択されていません。");
            return false;
        }

        if (!inputContents || !inputPlan) {
            alert("内容または対策が入力されていません。");
            return false;
        }

        setLoadingFlg(true); // ロード中表示

        // ミスを登録
        const response = await createMistakeHistory(selectedCategoryId, selectedCauseId, inputContents, inputPlan);
        console.log(response);
        switch (true) {
            case response['status'] === "OK":
                // 処理成功
                setInputContents(""); // 内容欄をクリア
                setInputPlan("");     // 対策欄をクリア
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
     * ログアウト処理
     */
    const handleLogout = () => {
        if (window.confirm("ログアウトします。よろしいですか？")) {
            cleaLocalStorage(); // ローカルストレージのトークンとユーザー名を削除
            navigate("/"); // ログイン画面に遷移
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
                <div style={{ marginBottom: '20px' }}>
                    <Button
                        variant="outlined"
                        onClick={handleLogout}
                        endIcon={<LogoutIcon />}
                    >ログアウト</Button>
                </div>
                <Divider />
                <h3>ミスを入力してください。</h3>
                <FormControl fullWidth style={{ marginBottom: '20px' }}>
                    <InputLabel id="select-category-label">分類</InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        label="Category"
                        value={selectedCategoryId}
                        onChange={(event: SelectChangeEvent<number>) => {
                            if (event.target.value) {
                                setSelectedCategoryId(event.target.value as number);
                            }
                        }}
                    >
                        {categoryList.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: '20px' }}>
                    <InputLabel id="select-cause-label">原因</InputLabel>
                    <Select
                        labelId="select-cause-label"
                        id="select-cause"
                        label="Cause"
                        value={selectedCauseId}
                        onChange={(event: SelectChangeEvent<number>) => {
                            if (event.target.value) {
                                setSelectedCauseId(event.target.value as number);
                            }
                        }}
                    >
                        {causeList.map((cause) => (
                            <MenuItem key={cause.value} value={cause.value}>
                                {cause.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        onChange={e => setInputContents(e.target.value)}
                        value={inputContents}
                        placeholder="内容を入力してください。"
                        label="内容"
                        multiline
                        fullWidth
                        rows={3}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        onChange={e => setInputPlan(e.target.value)}
                        value={inputPlan}
                        placeholder="対策を入力してください。"
                        label="対策"
                        multiline
                        fullWidth
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