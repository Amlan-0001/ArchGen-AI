import json
import re

from app.services.openai_service import generate_completion

from app.schemas.ui_schema import UISchema
from app.schemas.api_schema import APISchema
from app.schemas.db_schema import DBSchema


def clean_json_response(response_text: str):

    cleaned = re.sub(r"```json", "", response_text)
    cleaned = re.sub(r"```", "", cleaned)

    return cleaned.strip()


def generate_ui_schema(architecture):

    example_json = """
    {
      "pages": [
        {
          "page": "Dashboard",
          "components": [
            {
              "type": "button",
              "label": "Login"
            },
            {
              "type": "table",
              "label": "Customer Data"
            }
          ]
        }
      ]
    }
    """

    prompt = f"""
    Generate UI schema for this architecture.

    Return ONLY valid JSON.

    Example:

    {example_json}

    Architecture:
    {architecture}
    """

    response = generate_completion(prompt)

    print("\nRAW UI SCHEMA RESPONSE:\n")
    print(response)

    cleaned = clean_json_response(response)

    parsed = json.loads(cleaned)

    validated = UISchema(**parsed)

    return validated


def generate_api_schema(architecture):

    example_json = """
    {
      "endpoints": [
        {
          "route": "/login",
          "method": "POST"
        },
        {
          "route": "/payments",
          "method": "GET"
        }
      ]
    }
    """

    prompt = f"""
    Generate API schema.

    Return ONLY valid JSON.

    Example:

    {example_json}

    Architecture:
    {architecture}
    """

    response = generate_completion(prompt)

    print("\nRAW API SCHEMA RESPONSE:\n")
    print(response)

    cleaned = clean_json_response(response)

    parsed = json.loads(cleaned)

    validated = APISchema(**parsed)

    return validated


def generate_db_schema(architecture):

    example_json = """
    {
      "tables": [
        {
          "table_name": "users",
          "fields": ["email", "password"]
        },
        {
          "table_name": "payments",
          "fields": ["amount", "status"]
        }
      ]
    }
    """

    prompt = f"""
    Generate database schema.

    Return ONLY valid JSON.

    Example:

    {example_json}

    Architecture:
    {architecture}
    """

    response = generate_completion(prompt)

    print("\nRAW DB SCHEMA RESPONSE:\n")
    print(response)

    cleaned = clean_json_response(response)

    parsed = json.loads(cleaned)

    validated = DBSchema(**parsed)

    return validated