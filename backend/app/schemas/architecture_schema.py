from pydantic import BaseModel
from typing import List


class ArchitectureSchema(BaseModel):
    entities: List[str]
    pages: List[str]
    flows: List[str]