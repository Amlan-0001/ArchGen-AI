from app.pipeline.intent_extractor import extract_intent
from app.pipeline.system_designer import generate_system_design

intent = extract_intent(
    "Build a CRM application with login, payments, customer dashboard, and admin analytics."
)

architecture = generate_system_design(intent)

print("\nFINAL ARCHITECTURE:\n")
print(architecture)