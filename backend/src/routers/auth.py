from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import jwt
import asyncio
from typing import Optional
from fastapi.encoders import jsonable_encoder
from datetime import datetime, timedelta
from ..crud.UserMaster import LoginInput

from src import crud, dependencies, schemas

router = APIRouter()

SECRET_KEY = "cairocoders123456789"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """アクセストークン生成
    
    Args:
        data (int): ユーザーID
        expires_delta (str):有効期間

    Returns:
        str: jwt token
    """
    to_encode = data.copy()
    # 有効期限が設定されている場合
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    # 有効期限が設定されていない場合(デフォルト：15分)
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ログイン処理
@router.post("/login")
async def login(
    input:LoginInput,
    db:Session=Depends(dependencies.get_db)
    ) -> Any:
    try:
        # postデータの出力
        print("userName:", input.userName)
        print("password:", input.password)
        
        # ユーザー情報の取得
        users = crud.fetch_user(db, input)
        print("UserInfo:", users)
        # ユーザーが存在しない場合エラー
        if len(users) == 1:
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"sub": users[0].user_id}, expires_delta=access_token_expires
            )
            return {'status' : 'OK', 'token' : access_token}
        else:
            error_message = "Login failed"
            print("Error：:", error_message)
            return {'status' : 'NG'}
    
    except asyncio.CancelledError:
        error_message = "Request cancelled by client."
        raise HTTPException(status_code = 400, detail = error_message)

# アクセストークンの検証
class CheckTokenInput(BaseModel):
    token: str

@router.post("/checktoken")
async def check_token(input: CheckTokenInput):
    # postデータの出力
    print("token:", input.token)
    try:
        payload = jwt.decode(input.token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Payload：:", payload)
        userid: str = payload.get("sub")
        if userid is None:
            print("ユーザー情報無し")
            return {'status' : 'NG'}
        print("OK")
        return {'status' : 'OK'}
    except jwt.ExpiredSignatureError:
        print("トークンの有効期限切れ")
        return {'status' : 'EXPIRE'}
    except jwt.JWTError:
        print("資格情報検証不可")
        raise HTTPException(status_code=401, detail="Could not validate credentials")