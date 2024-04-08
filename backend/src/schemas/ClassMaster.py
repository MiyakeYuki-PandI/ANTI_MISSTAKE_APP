from pydantic import BaseModel
from datetime import datetime

class ClassMasterBase(BaseModel):
    class_id: int
    class_name: str


class ClassMasterCreate(ClassMasterBase):
    class_id: int
    class_name: str


class ClassMaster(ClassMasterBase):
    class_id: int
    class_name: str

    class Config:
        from_attributes = True