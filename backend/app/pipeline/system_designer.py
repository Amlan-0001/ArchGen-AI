import json
import re

from app.services.openai_service import generate_completion
from app.schemas.architecture_schema import ArchitectureSchema


def clean_json_response(response_text: str):

    cleaned = re.sub(r"```json", "", response_text)
    cleaned = re.sub(r"```", "", cleaned)

    return cleaned.strip()


def generate_system_design(intent_data):

    prompt = f"""
    Based on the following app intent,
    generate software architecture details.

    Return ONLY valid JSON.

    Example format:

    {{
      "entities": ["User", "Payment"],
      "pages": ["Login", "Dashboard"],
      "flows": ["User authentication flow"]
    }}

    Intent Data:
    {intent_data}
    """

    response = generate_completion(prompt)

    print("\nRAW ARCHITECTURE RESPONSE:\n")
    print(response)

    cleaned_response = clean_json_response(response)

    parsed_json = json.loads(cleaned_response)

    validated_architecture = ArchitectureSchema(**parsed_json)

    return validated_architecture