from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from src import models, schemas
from sqlalchemy.sql import text

def fetch_cause(db: Session) -> List[models.CauseMaster]:
    sql = "SELECT"\
          " cause_id"\
          " ,cause_name"\
          " FROM" \
          " M_CAUSE"
    print("SQL:", sql)
    return db.execute(text(sql)).all()