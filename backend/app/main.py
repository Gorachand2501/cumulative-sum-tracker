from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.database import engine
from app.database import get_db

from app import models
from app import crud
from app import schemas


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Hello FastAPI"
    }


@app.get(
    "/numbers",
    response_model=list[schemas.NumberResponse]
)
def get_numbers(
    db: Session = Depends(get_db)
):
    return crud.get_all_numbers(db)


@app.post("/numbers")
def add_number(
    data: schemas.NumberInput,
    db: Session = Depends(get_db)
):
    return crud.create_number(db, data)


@app.get(
    "/sum",
    response_model=schemas.SumResponse
)
def get_sum(
    db: Session = Depends(get_db)
):

    latest = crud.get_latest_number(db)

    if latest:
        return {
            "total": latest.cumulative_sum
        }

    return {
        "total": 0
    }