from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# 環境変数の読み込み
load_dotenv()

# ルーターの読み込み
from .routers import auth, category, cause, mistake_history

app = FastAPI()

# ReactのURLを記載
origins = [os.environ['ORIGIN_URL']]

# 権限の設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーティング
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(cause.router, prefix="/cause", tags=["cause"])
app.include_router(category.router, prefix="/category", tags=["category"])
app.include_router(mistake_history.router, prefix="/mistakehistory", tags=["mistakehistory"])