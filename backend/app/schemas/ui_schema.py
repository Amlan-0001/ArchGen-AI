from pydantic import BaseModel
from typing import List


class UIComponent(BaseModel):
    type: str
    label: str


class UIPage(BaseModel):
    page: str
    components: List[UIComponent]


class UISchema(BaseModel):
    pages: List[UIPage]