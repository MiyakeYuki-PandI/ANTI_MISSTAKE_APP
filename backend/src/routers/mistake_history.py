from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import asyncio
from .auth import CheckTokenInput
from ..crud.MistakeHistory import MistakeHistoryInput
from datetime import datetime

from src import crud, dependencies, schemas, models

router = APIRouter()

# ミス履歴を登録
@router.post("/create")
async def create_mistake_history(
    # input:CheckTokenInput,
    input:MistakeHistoryInput,
    db:Session=Depends(dependencies.get_db)
    ) -> Any:
    try:
        # postデータの出力
        print("mistake_history:", input)
    
        db_mistake_history = crud.create_mistake_history(
            db,
            user_id=1, # 仮
            create_date=datetime.now(),
            mistake_history=input)
        print("result:", db_mistake_history)
        # ミス履歴の登録に成功した場合
        if db_mistake_history:
            print("OK")
            return {'status' : 'OK'}
        else:
            error_message = "Create Mistake History failed"
            print("Error：:", error_message)
            return {'status' : 'NG'}
    
    except asyncio.CancelledError:
        error_message = "Request cancelled by client."
        raise HTTPException(status_code = 400, detail = error_message)