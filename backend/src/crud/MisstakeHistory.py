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

class MisstakeHistoryInput(BaseModel):
    class_id   : int
    cause_id   : int
    contents   : str
    plan       : str
    
def create_mistake_history(
    db: Session,
    user_id,
    create_date,
    mistake_history: schemas.MisstakeHistory
    ) -> models.MisstakeHistory:
    db_misstake_history = models.MisstakeHistory(
        user_id=user_id,
        create_date=create_date,
        class_id=mistake_history.class_id,
        cause_id=mistake_history.cause_id,
        contents=mistake_history.contents,
        plan=mistake_history.plan
    )
    db.add(db_misstake_history)
    db.commit()
    db.refresh(db_misstake_history)
    return db_misstake_history