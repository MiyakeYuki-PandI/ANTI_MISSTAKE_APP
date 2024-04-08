from sqlalchemy import Column, String, SmallInteger
# from sqlalchemy.orm import relationship

from .base import Base

class ClassMaster(Base):
    __tablename__ = "M_CLASS"

    class_id     = Column(SmallInteger, primary_key=True, index=True)
    class_name   = Column(String, index=True)
    
    def to_dict(self):
        return {
            "class_id": self.class_id,
            "class_name": self.class_name
        }