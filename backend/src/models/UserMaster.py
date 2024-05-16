from sqlalchemy import Column, String, TIMESTAMP,Integer
# from sqlalchemy.orm import relationship

from .base import Base

class UserMaster(Base):
    __tablename__ = "M_USER"

    user_id     = Column(Integer, primary_key=True, index=True)
    user_name   = Column(String, index=True)
    password    = Column(String)
    create_date = Column(TIMESTAMP)

    # items = relationship("Item", back_populates="owner")