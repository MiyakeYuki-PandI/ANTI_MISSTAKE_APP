from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import asyncio
from .auth import CheckTokenInput

from src import crud, dependencies, schemas, models

router = APIRouter()

# 分類マスタからレコードを全件取得
@router.post("/fetchcategory")
async def feach_category(
    input:CheckTokenInput,
    db:Session=Depends(dependencies.get_db)
    ) -> Any:
    try:
        # postデータの出力
        print("token:", input.token)
    
        category_list = crud.fetch_category(db)
        print("categoryList:", category_list)
        # 取得したレコードが0件以上の場合、分類マスタのレコードを返す
        if len(category_list) > 0:
            print("OK")
            return {'status' : 'OK', 'categoryList' : [category_to_dict(category) for category in category_list]}
        else:
            error_message = "Fetch categoryList failed"
            print("Error：:", error_message)
            return {'status' : 'NG'}
    
    except asyncio.CancelledError:
        error_message = "Request cancelled by client."
        raise HTTPException(status_code = 400, detail = error_message)
    
def category_to_dict(category):
    """CategoryMasterを連想配列に変換
    
    Args:
        category (CategoryMaster): CategoryMaster(obj)

    Returns:
        Array: {"value": int, "labal": str}
    """
    return {
        "value": category.category_id,
        "label": category.category_name
    }