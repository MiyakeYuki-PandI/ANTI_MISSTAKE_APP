from pydantic import BaseModel
from datetime import datetime

class MisstakeHistoryBase(BaseModel):
    user_id: int
    create_date:datetime

class MisstakeHistoryCreate(MisstakeHistoryBase):
    user_id: int
    create_date:datetime
    class_id:int
    cause_id:int
    contents:str
    plan:str
    
class MisstakeHistory(MisstakeHistoryBase):
    user_id: int
    create_date:datetime
    class_id:int
    cause_id:int
    contents:str
    plan:str

    class Config:
        from_attributes = True