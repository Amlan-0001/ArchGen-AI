from app.services.openai_service import generate_completion

response = generate_completion(
    "Say hello in one sentence."
)

print(response)