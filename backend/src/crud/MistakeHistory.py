from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from src import models, schemas
from sqlalchemy.sql import text
from datetime import datetime

# def fetch_mistake_history(db: Session, input:LoginInput) -> List[models.UserMaster]:
#     sql = "SELECT"\
#           " user_id"\
#           " ,user_name"\
#           " FROM" \
#           " M_USER" \
#           " WHERE"\
#          f" user_name = '{input.userName}' AND password = '{input.password}';"
#     print("SQL:", sql)
#     return db.execute(text(sql)).all()

class MistakeHistoryInput(BaseModel):
    category_id   : int
    cause_id   : int
    contents   : str
    plan       : str
    
def create_mistake_history(
    db: Session,
    user_id,
    create_date,
    mistake_history: schemas.MistakeHistory
    ) -> models.MistakeHistory:
    db_mistake_history = models.MistakeHistory(
        user_id=user_id,
        create_date=create_date,
        category_id=mistake_history.category_id,
        cause_id=mistake_history.cause_id,
        contents=mistake_history.contents,
        plan=mistake_history.plan
    )
    db.add(db_mistake_history)
    db.commit()
    db.refresh(db_mistake_history)
    return db_mistake_history