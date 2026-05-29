from pydantic import BaseModel
from typing import List


class ValidationIssue(BaseModel):
    issue: str
    severity: str


class ValidationResult(BaseModel):
    valid: bool
    issues: List[ValidationIssue]