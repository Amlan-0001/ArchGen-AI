from fastapi import APIRouter

from app.schemas.response_schema import (
    PromptRequest
)

from app.pipeline.master_pipeline import (
    run_full_pipeline
)

router = APIRouter()


@router.post("/generate")
def generate_app_blueprint(
    request: PromptRequest
):

    result = run_full_pipeline(
        request.prompt
    )

    return {
        "status": "success",
        "data": result
    }