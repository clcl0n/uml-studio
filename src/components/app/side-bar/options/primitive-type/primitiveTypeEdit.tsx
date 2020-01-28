import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IPrimitiveType from '@interfaces/class-diagram/primitive-type/IPrimitiveType';
import FrameEdit from '../common/frameEdit';
import { useDispatch } from 'react-redux';
import { updateElement } from '@store/actions/classDiagram.action';

const PrimitiveTypeEdit = (props: { primitiveType: IPrimitiveType }) => {
    const dispatch = useDispatch();
    const { data } = props.primitiveType;

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updated = {...props.primitiveType};
        updated.data.elementName = event.target.value;
        dispatch(updateElement(updated));
    };

    return (
        <FrameEdit inputLabel='Primitive Type Name' frameName={data.elementName} onNameChange={onNameChange}>
            <div/>
        </FrameEdit>
    );
};

export default PrimitiveTypeEdit;