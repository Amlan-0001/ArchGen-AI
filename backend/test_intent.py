from app.pipeline.intent_extractor import extract_intent

response = extract_intent(
    "Build a CRM application with login, payments, customer dashboard, and admin analytics."
)

print(response)