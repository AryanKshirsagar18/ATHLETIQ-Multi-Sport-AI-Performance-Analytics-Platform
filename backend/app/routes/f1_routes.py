from fastapi import APIRouter
from app.services.f1_service import get_f1_roster

router = APIRouter(prefix="/f1", tags=["Formula 1"])

@router.get("/drivers")
async def list_drivers():
    return await get_f1_roster()