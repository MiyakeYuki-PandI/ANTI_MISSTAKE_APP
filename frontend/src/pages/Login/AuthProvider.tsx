import React, { createContext, Dispatch, useReducer, ReactNode, useContext } from 'react';

// アクションの型を定義
type Action =
    | { type: 'setUserId'; payload: string }
    | { type: 'setUserName'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setToken'; payload: string };

// State の型を定義
interface State {
    userId: string;
    userName: string;
    password: string;
    token: string;
}

// 初期ステートの定義
const initialState: State = {
    userId: '',
    userName: '',
    password: '',
    token: '',
};

// コンテキストの作成
export const AuthContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// リデューサーの定義
const chatReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUserId':
            return { ...state, userId: action.payload };
        case 'setUserName':
            return { ...state, userName: action.payload };
        case 'setPassword':
            return { ...state, password: action.payload };
        case 'setToken':
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

// ChatProvider コンポーネント
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// カスタムフックを作成
export const useAppState = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAppState must be used within AuthProvider');
    }
    return context;
};