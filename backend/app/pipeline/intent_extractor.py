import json
import re

from app.services.openai_service import generate_completion
from app.schemas.intent_schema import IntentSchema


def clean_json_response(response_text: str):

    # Remove markdown code blocks
    cleaned = re.sub(r"```json", "", response_text)
    cleaned = re.sub(r"```", "", cleaned)

    return cleaned.strip()


def extract_intent(user_prompt: str):

    prompt = f"""
    Analyze the following app request and extract:

    - app_type
    - features
    - roles
    - business_rules

    Return ONLY valid JSON.

    Example format:

    {{
      "app_type": "CRM",
      "features": ["login", "payments"],
      "roles": ["admin", "user"],
      "business_rules": []
    }}

    User Request:
    {user_prompt}
    """

    response = generate_completion(prompt)

    print("\nRAW LLM RESPONSE:\n")
    print(response)

    cleaned_response = clean_json_response(response)

    parsed_json = json.loads(cleaned_response)

    validated_intent = IntentSchema(**parsed_json)

    return validated_intent
