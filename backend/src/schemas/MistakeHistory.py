from pydantic import BaseModel
from datetime import datetime

class MistakeHistoryBase(BaseModel):
    user_id: int
    create_date:datetime

class MistakeHistoryCreate(MistakeHistoryBase):
    user_id: int
    create_date:datetime
    category_id:int
    cause_id:int
    contents:str
    plan:str
    
class MistakeHistory(MistakeHistoryBase):
    user_id: int
    create_date:datetime
    category_id:int
    cause_id:int
    contents:str
    plan:str

    class Config:
        from_attributes = True