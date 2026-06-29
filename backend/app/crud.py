from sqlalchemy.orm import Session

from app import models
from app import schemas


def get_all_numbers(db: Session):
    return db.query(models.Number).all()


def get_latest_number(db: Session):
    return (
        db.query(models.Number)
        .order_by(models.Number.id.desc())
        .first()
    )


def create_number(db: Session, data: schemas.NumberInput):

    latest = get_latest_number(db)

    if latest:
        new_sum = latest.cumulative_sum + data.value
    else:
        new_sum = data.value

    new_number = models.Number(
        value=data.value,
        cumulative_sum=new_sum
    )

    db.add(new_number)

    db.commit()

    db.refresh(new_number)

    return new_number