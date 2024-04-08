from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

# postgreSQL接続情報
SQLALCHEMY_DATABASE_URL = os.environ['DATABASE_URL']

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()