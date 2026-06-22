from pydantic import BaseModel


class ChatRequest(BaseModel):
    region_id: int
    question: str


class ChatResponse(BaseModel):
    answer: str