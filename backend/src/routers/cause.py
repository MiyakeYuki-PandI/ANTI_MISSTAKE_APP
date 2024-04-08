from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import asyncio
from .auth import CheckTokenInput

from src import crud, dependencies, schemas, models

router = APIRouter()

# 原因マスタからレコードを全件取得
@router.post("/fetchcause")
async def feach_cause(
    input:CheckTokenInput,
    db:Session=Depends(dependencies.get_db)
    ) -> Any:
    try:
        # postデータの出力
        print("token:", input.token)
    
        cause_list = crud.fetch_cause(db)
        print("causeList:", cause_list)
        # 取得したレコードが0件以上の場合、原因マスタのレコードを返す
        if len(cause_list) > 0:
            print("OK")
            return {'status' : 'OK', 'causeList' : [cause_to_dict(cause) for cause in cause_list]}
        else:
            error_message = "Fetch causeList failed"
            print("Error：:", error_message)
            return {'status' : 'NG'}
    
    except asyncio.CancelledError:
        error_message = "Request cancelled by client."
        raise HTTPException(status_code = 400, detail = error_message)

def cause_to_dict(cause):
    """CauseMasterを連想配列に変換
    
    Args:
        cause (CauseMaster): CauseMaster(obj)

    Returns:
        Array: {"causeId": int, "causeName": str}
    """
    return {
        "causeId": cause.cause_id,
        "causeName": cause.cause_name
    }