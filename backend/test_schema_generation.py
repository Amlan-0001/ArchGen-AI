from app.pipeline.intent_extractor import extract_intent
from app.pipeline.system_designer import generate_system_design
from app.pipeline.schema_generator import (
    generate_ui_schema,
    generate_api_schema,
    generate_db_schema
)

intent = extract_intent(
    "Build a CRM application with login, payments, customer dashboard, and admin analytics."
)

architecture = generate_system_design(intent)

ui_schema = generate_ui_schema(architecture)

api_schema = generate_api_schema(architecture)

db_schema = generate_db_schema(architecture)

print("\nUI SCHEMA:\n")
print(ui_schema)

print("\nAPI SCHEMA:\n")
print(api_schema)

print("\nDB SCHEMA:\n")
print(db_schema)