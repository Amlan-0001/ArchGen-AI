from app.pipeline.intent_extractor import (
    extract_intent
)

from app.pipeline.system_designer import (
    generate_system_design
)

from app.pipeline.schema_generator import (
    generate_ui_schema,
    generate_api_schema,
    generate_db_schema
)

from app.validators.consistency_validator import (
    validate_system_consistency
)

from app.repair.repair_engine import (
    repair_failed_components
)


def run_full_pipeline(user_prompt: str):

    print("\nSTEP 1 — INTENT EXTRACTION\n")

    intent = extract_intent(user_prompt)

    print(intent)

    print("\nSTEP 2 — SYSTEM DESIGN\n")

    architecture = generate_system_design(intent)

    print(architecture)

    print("\nSTEP 3 — UI SCHEMA GENERATION\n")

    ui_schema = generate_ui_schema(architecture)

    print(ui_schema)

    print("\nSTEP 4 — API SCHEMA GENERATION\n")

    api_schema = generate_api_schema(architecture)

    print(api_schema)

    print("\nSTEP 5 — DB SCHEMA GENERATION\n")

    db_schema = generate_db_schema(architecture)

    print(db_schema)

    print("\nSTEP 6 — VALIDATION\n")

    validation_result = validate_system_consistency(
        ui_schema,
        api_schema,
        db_schema
    )

    print(validation_result)

    repair_result = None

    if not validation_result.valid:

        print("\nSTEP 7 — REPAIR ENGINE\n")

        repair_result = repair_failed_components(
            architecture,
            ui_schema,
            api_schema,
            db_schema
        )

        print(repair_result)

    return {
        "intent": intent.model_dump(),
        "architecture": architecture.model_dump(),
        "ui_schema": ui_schema.model_dump(),
        "api_schema": api_schema.model_dump(),
        "db_schema": db_schema.model_dump(),
        "validation": validation_result.model_dump(),
        "repair_result": (
            repair_result
            if repair_result else "No repair needed"
        )
    }