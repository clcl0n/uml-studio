import ribbonOperationsEnum from '@enums/storeActions/ribbonOperationsEnum';
import IChangeOperationAction from '@interfaces/IChangeOperationAction';
import { CHANGE_OPERATION } from '@actions/ribbon';

export function changeOperation(newOperation: ribbonOperationsEnum): IChangeOperationAction {
    return {
        type: CHANGE_OPERATION,
        payload: newOperation
    }
}