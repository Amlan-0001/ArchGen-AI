from app.schemas.validation_schema import (
    ValidationIssue,
    ValidationResult
)


def validate_system_consistency(
    ui_schema,
    api_schema,
    db_schema
):

    issues = []

    # Extract UI pages
    ui_pages = [page.page.lower() for page in ui_schema.pages]

    # Extract API routes
    api_routes = [
        endpoint.route.lower()
        for endpoint in api_schema.endpoints
    ]

    # Semantic consistency checks
    for page in ui_pages:

        # Customer dashboard check
        if "customer" in page:

            customer_api_exists = any(
                "customer" in route
                for route in api_routes
            )

            if not customer_api_exists:

                issues.append(
                    ValidationIssue(
                        issue=f"No customer API found for page: {page}",
                        severity="high"
                    )
                )

        # Admin dashboard check
        if "admin" in page:

            admin_api_exists = any(
                "admin" in route
                for route in api_routes
            )

            if not admin_api_exists:

                issues.append(
                    ValidationIssue(
                        issue=f"No admin API found for page: {page}",
                        severity="high"
                    )
                )

        # Payment check
        if "payment" in page:

            payment_api_exists = any(
                "payment" in route
                for route in api_routes
            )

            if not payment_api_exists:

                issues.append(
                    ValidationIssue(
                        issue=f"No payment API found for page: {page}",
                        severity="critical"
                    )
                )

    # DB consistency checks
    payment_table_exists = any(
        table.table_name == "payments"
        for table in db_schema.tables
    )

    payment_api_exists = any(
        "/payments" in route
        for route in api_routes
    )

    if payment_api_exists and not payment_table_exists:

        issues.append(
            ValidationIssue(
                issue="Payments API exists but payments table missing",
                severity="critical"
            )
        )

    validation_result = ValidationResult(
        valid=len(issues) == 0,
        issues=issues
    )

    return validation_result