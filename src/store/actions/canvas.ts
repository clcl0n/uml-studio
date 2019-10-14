import RibbonModeEnum from '@enums/storeActions/ribbonOperationsEnum';

export function drawNewElement(element: RibbonModeEnum, event: React.MouseEvent<SVGElement, MouseEvent>) {
    return {
        type: element,
        payload: { 
            event
        }
    }
}