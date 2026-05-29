from app.pipeline.intent_extractor import extract_intent
from app.pipeline.system_designer import generate_system_design

from app.pipeline.schema_generator import (
    generate_ui_schema,
    generate_api_schema,
    generate_db_schema
)

from app.validators.consistency_validator import (
    validate_system_consistency
)

intent = extract_intent(
    "Build a CRM application with login, payments, customer dashboard, and admin analytics."
)

architecture = generate_system_design(intent)

ui_schema = generate_ui_schema(architecture)

api_schema = generate_api_schema(architecture)

db_schema = generate_db_schema(architecture)

validation_result = validate_system_consistency(
    ui_schema,
    api_schema,
    db_schema
)

print("\nVALIDATION RESULT:\n")
print(validation_result)