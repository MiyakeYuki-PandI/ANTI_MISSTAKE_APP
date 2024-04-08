from sqlalchemy import Column, String, SmallInteger
# from sqlalchemy.orm import relationship

from .base import Base

class CauseMaster(Base):
    __tablename__ = "M_CAUSE"

    cause_id     = Column(SmallInteger, primary_key=True, index=True)
    cause_name   = Column(String, index=True)
    
    def to_dict(self):
        return {
            "cause_id": self.cause_id,
            "cause_name": self.cause_name
        }