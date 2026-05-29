from openai import OpenAI

from app.config import (
    GROQ_API_KEY,
    GROQ_BASE_URL,
    GROQ_MODEL,
    TEMPERATURE
)


def generate_completion(prompt: str):
    if not GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is not configured")

    client = OpenAI(
        api_key=GROQ_API_KEY,
        base_url=GROQ_BASE_URL
    )

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        temperature=TEMPERATURE,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert AI software architect. "
                    "Always return structured deterministic outputs."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content