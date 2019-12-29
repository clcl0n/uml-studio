import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IFrame from '@interfaces/class-diagram/common/IFrame';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';

const Frame = (props: {graphicData: IFrame, functionality: IFrameFunctionality, children: React.ReactNode}) => {
    const { graphicData, functionality } = props;

    return (
        <g
            className='umlClass'
            pointerEvents='all'
            // onMouseDown={(ev) => props.elementFunctionality.onClassMouseDown(ev, props.elementData.id)}
            // onMouseUp={(ev) => props.elementFunctionality.onClassMouseUp(ev)}
            onClick={(ev) => functionality.onFrameClick(ev)}
            onMouseOver={(ev) => functionality.onFrameMouseOver(ev)}
            onMouseLeave={(ev) => functionality.onFrameMouseLeave(ev)}
        >
            <g>
                <rect
                    x={graphicData.x}
                    y={graphicData.y}
                    width={graphicData.width}
                    height={graphicData.height}
                    stroke='black'
                    fill='none'
                    strokeWidth='3'
                />
            </g>
            {props.children}
        </g>
    );
};

export default Frame;