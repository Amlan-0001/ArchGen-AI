from app.pipeline.schema_generator import (
    generate_api_schema
)

from app.validators.consistency_validator import (
    validate_system_consistency
)


def repair_failed_components(
    architecture,
    ui_schema,
    api_schema,
    db_schema
):

    validation_result = validate_system_consistency(
        ui_schema,
        api_schema,
        db_schema
    )

    if validation_result.valid:

        return {
            "status": "No repair needed",
            "api_schema": api_schema
        }

    print("\nREPAIRING API SCHEMA...\n")

    repaired_api_schema = generate_api_schema(architecture)

    repaired_validation = validate_system_consistency(
        ui_schema,
        repaired_api_schema,
        db_schema
    )

    return {
        "status": "Repair attempted",
        "validation_result": repaired_validation,
        "api_schema": repaired_api_schema
    }