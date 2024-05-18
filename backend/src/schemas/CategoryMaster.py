from pydantic import BaseModel
from datetime import datetime

class CategoryMasterBase(BaseModel):
    class_id: int
    class_name: str


class CategoryMasterCreate(CategoryMasterBase):
    class_id: int
    class_name: str


class CategoryMaster(CategoryMasterBase):
    class_id: int
    class_name: str

    class Config:
        from_attributes = True