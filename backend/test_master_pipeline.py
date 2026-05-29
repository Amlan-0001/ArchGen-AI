from app.pipeline.master_pipeline import (
    run_full_pipeline
)

result = run_full_pipeline(
    "Build a CRM application with login, payments, customer dashboard, and admin analytics."
)

print("\nFINAL PIPELINE OUTPUT:\n")

print(result)