import CanvasEnum from '@enums/storeActions/canvasEnum';
import RibbonModeEnum from '@enums/storeActions/ribbonOperationsEnum';

export default interface ICanvasReducerPayload {
    type: RibbonModeEnum,
    payload: any
}