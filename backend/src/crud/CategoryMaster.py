from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from src import models, schemas
from sqlalchemy.sql import text

def fetch_category(db: Session) -> List[models.CategoryMaster]:
    sql = "SELECT"\
          " category_id"\
          " ,category_name"\
          " FROM" \
          " M_CATEGORY"
    print("SQL:", sql)
    return db.execute(text(sql)).all()