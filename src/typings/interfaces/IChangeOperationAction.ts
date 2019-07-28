import RibbonModeEnum from '@enums/ribbonOperationsEnum';
import { CHANGE_OPERATION } from '@actions/ribbon';

export default interface IChangeOperationAction {
    type: typeof CHANGE_OPERATION;
    payload: RibbonModeEnum;
}