import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import FrameEdit from '../common/frameEdit';
import { useDispatch } from 'react-redux';
import { updatePrimitiveType } from '@store/actions/classDiagram';

const PrimitiveTypeEdit = (props: { primitiveType: IPrimitiveType }) => {
    const dispatch = useDispatch();
    const { data } = props.primitiveType;

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.primitiveType};
        updated.data.primitiveName = event.target.value;
        dispatch(updatePrimitiveType(updated));
    };

    return (
        <FrameEdit inputLabel='Primitive Type Name' frameName={data.primitiveName} onNameChange={onNameChange}>
            <div/>
        </FrameEdit>
    );
};

export default PrimitiveTypeEdit;