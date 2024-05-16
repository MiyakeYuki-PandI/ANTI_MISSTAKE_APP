from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import asyncio
from .auth import CheckTokenInput

from src import crud, dependencies, schemas, models

router = APIRouter()

# 分類マスタからレコードを全件取得
@router.post("/fetchclass")
async def feach_class(
    input:CheckTokenInput,
    db:Session=Depends(dependencies.get_db)
    ) -> Any:
    try:
        # postデータの出力
        print("token:", input.token)
    
        class_list = crud.fetch_class(db)
        print("classList:", class_list)
        # 取得したレコードが0件以上の場合、分類マスタのレコードを返す
        if len(class_list) > 0:
            print("OK")
            return {'status' : 'OK', 'classList' : [class_to_dict(_class) for _class in class_list]}
        else:
            error_message = "Fetch classList failed"
            print("Error：:", error_message)
            return {'status' : 'NG'}
    
    except asyncio.CancelledError:
        error_message = "Request cancelled by client."
        raise HTTPException(status_code = 400, detail = error_message)
    
def class_to_dict(_class):
    """ClassMasterを連想配列に変換
    
    Args:
        _class (ClassMaster): ClassMaster(obj)

    Returns:
        Array: {"value": int, "labal": str}
    """
    return {
        "value": _class.class_id,
        "label": _class.class_name
    }