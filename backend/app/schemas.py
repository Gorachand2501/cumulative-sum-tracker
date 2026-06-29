from datetime import datetime

from pydantic import BaseModel, Field

class NumberInput(BaseModel):
    value: int = Field(
        ge=0,
        le=99,
        description="Value must be between 0 and 99"
    )


class NumberResponse(BaseModel):
    id: int
    value: int
    cumulative_sum: int
    created_at: datetime

    class Config:
        from_attributes = True


class SumResponse(BaseModel):
    total: int