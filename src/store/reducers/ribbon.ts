import IChangeOperationAction from '@interfaces/IChangeOperationAction';
import { CHANGE_OPERATION } from '@actions/ribbon';

const ribbonReducer = (state = '', action: IChangeOperationAction) => {
    switch(action.type) {
        case CHANGE_OPERATION:
            return action.payload;
        default:
            return state;
    }
}

export default ribbonReducer;