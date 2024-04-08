from pydantic import BaseModel
from datetime import datetime

class UserMasterBase(BaseModel):
    user_name: str


class UserMasterCreate(UserMasterBase):
    password: str
    create_date:datetime


class UserMaster(UserMasterBase):
    user_id: str
    user_name: str

    class Config:
        from_attributes = True