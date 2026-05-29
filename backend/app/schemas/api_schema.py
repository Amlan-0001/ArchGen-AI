from pydantic import BaseModel
from typing import List


class APIEndpoint(BaseModel):
    route: str
    method: str


class APISchema(BaseModel):
    endpoints: List[APIEndpoint]