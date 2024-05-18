from sqlalchemy import Column, String, SmallInteger
# from sqlalchemy.orm import relationship

from .base import Base

class CategoryMaster(Base):
    __tablename__ = "M_CATEGORY"

    category_id     = Column(SmallInteger, primary_key=True, index=True)
    category_name   = Column(String, index=True)
    
    def to_dict(self):
        return {
            "category_id": self.category_id,
            "category_name": self.category_name
        }