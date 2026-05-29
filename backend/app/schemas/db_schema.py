from pydantic import BaseModel
from typing import List


class DBTable(BaseModel):
    table_name: str
    fields: List[str]


class DBSchema(BaseModel):
    tables: List[DBTable]