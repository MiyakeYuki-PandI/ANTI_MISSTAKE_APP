from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from src import models, schemas
from sqlalchemy.sql import text

def fetch_class(db: Session) -> List[models.ClassMaster]:
    sql = "SELECT"\
          " class_id"\
          " ,class_name"\
          " FROM" \
          " M_CLASS"
    print("SQL:", sql)
    return db.execute(text(sql)).all()