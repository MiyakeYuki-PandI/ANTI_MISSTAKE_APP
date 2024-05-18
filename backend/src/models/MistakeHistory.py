from sqlalchemy import Column, String, TIMESTAMP,Integer
# from sqlalchemy.orm import relationship

from .base import Base

class MistakeHistory(Base):
    __tablename__ = "mistake_history"

    user_id     = Column(Integer, primary_key=True, index=True)
    create_date = Column(TIMESTAMP, primary_key=True, index=True)
    category_id    = Column(Integer)
    cause_id    = Column(Integer)
    contents    = Column(String)
    plan        = Column(String)

    # items = relationship("Item", back_populates="owner")