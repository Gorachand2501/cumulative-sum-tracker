from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.database import Base


class Number(Base):

    __tablename__ = "numbers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    value = Column(Integer)

    cumulative_sum = Column(Integer)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )