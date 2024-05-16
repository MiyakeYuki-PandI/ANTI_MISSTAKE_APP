from sqlalchemy import Column, String, TIMESTAMP,Integer
# from sqlalchemy.orm import relationship

from .base import Base

class MisstakeHistory(Base):
    __tablename__ = "carelessmiss_history"

    user_id     = Column(Integer, primary_key=True, index=True)
    create_date = Column(TIMESTAMP, primary_key=True, index=True)
    class_id    = Column(Integer)
    cause_id    = Column(Integer)
    contents    = Column(String)
    plan        = Column(String)

    # items = relationship("Item", back_populates="owner")