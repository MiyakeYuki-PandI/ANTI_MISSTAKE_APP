from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from src import models, schemas
from sqlalchemy.sql import text

class LoginInput(BaseModel):
    userName: str
    password: str

def fetch_user(db: Session, input:LoginInput) -> List[models.UserMaster]:
    sql = "SELECT"\
          " user_id"\
          " ,user_name"\
          " FROM" \
          " M_USER" \
          " WHERE"\
         f" user_name = '{input.userName}' AND password = '{input.password}';"
    print("SQL:", sql)
    return db.execute(text(sql)).all()

# def create_user(db: Session, user: schemas.UserMasterCreate) -> models.UserMaster:
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user