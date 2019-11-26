import IChangeOperationAction from '@interfaces/IChangeOperationAction';
import { CHANGE_OPERATION } from '@actions/ribbon';
import * as log from 'loglevel';

const ribbonReducer = (state = '', action: IChangeOperationAction) => {
    switch(action.type) {
        case CHANGE_OPERATION:
            log.debug(`Redux - operation changed: ${action.payload}`);
            return action.payload;
        default:
            return state;
    }
}

export default ribbonReducer;