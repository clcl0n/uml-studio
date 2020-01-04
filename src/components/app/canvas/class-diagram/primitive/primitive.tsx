import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Frame from '../common/frame';
import FrameHead from '../common/frameHead';
import PrimitiveHead from './primitiveHead';
import IPrimitiveProps from '@interfaces/class-diagram/primitive/IPrimitiveProps';
import { useDispatch } from 'react-redux';
import { selectNewElement } from '@store/actions/canvas';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Joints from '../common/joints';
import IPrimitiveHead from '@interfaces/class-diagram/primitive/IPrimitiveHead';

const Primitive = (props: IPrimitiveProps) => {
    const dispatch = useDispatch();
    const [joints, setJoints] = React.useState(<g/>);
    const { frame } = props.primitive.graphicData;
    const { data } = props.primitive;

    const onPrimitiveClick = (ev: React.MouseEvent) => {
        dispatch(selectNewElement(props.primitive.id));
    };
    const frameFunctionality: IFrameFunctionality = {
        onFrameResize: () => {},
        onFrameSetDefaultWidth: () => {},
        onFrameClick: onPrimitiveClick,
        onFrameMouseLeave: (event: React.MouseEvent) => {
            setJoints(<g/>);
        },
        onFrameMouseOver: (event: React.MouseEvent) => {
            setJoints((
                <Joints
                    coordinates={{ x: frame.x, y: frame.y }}
                    width={frame.width}
                    height={frame.height}
                    onJointClick={props.functionality.onJointClick}
                />
            ));
        }
    };
    const headData: IPrimitiveHead = {
        graphicData: {
            text: {
                x: frame.xCenter,
                y: frame.y + frame.rowHeight
            },
            title: {
                x: frame.xCenter,
                y: frame.y + (frame.rowHeight / 2)
            }
        },
        data: {
            text: data.primitiveName
        }
    };
    
    return (
        <Frame graphicData={frame} functionality={frameFunctionality}>
            <FrameHead>
                <PrimitiveHead {...headData}/>
            </FrameHead>
            {joints}
        </Frame>
    );
};

export default Primitive;