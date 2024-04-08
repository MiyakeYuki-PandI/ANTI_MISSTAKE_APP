from pydantic import BaseModel
from datetime import datetime

class CauseMasterBase(BaseModel):
    cause_id: int
    cause_name: str


class CauseMasterCreate(CauseMasterBase):
    cause_id: int
    cause_name: str


class CauseMaster(CauseMasterBase):
    cause_id: int
    cause_name: str

    class Config:
        from_attributes = True