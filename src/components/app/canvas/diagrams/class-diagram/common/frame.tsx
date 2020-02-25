import React from 'react';
import ReactDOM from 'react-dom';
import IFrame from '@interfaces/class-diagram/common/IFrame';
import IFrameFunctionality from '@interfaces/class-diagram/common/IFrameFunctionality';
import Direction from '@enums/direction';

const Frame = (props: {graphicData: IFrame, functionality: IFrameFunctionality, children: React.ReactNode}) => {
    const { graphicData, functionality } = props;

    return (
        <g
            className='umlClass'
            pointerEvents='all'
            onClick={(ev) => functionality.onFrameClick(ev)}
            onMouseOver={(ev) => functionality.onFrameMouseOver(ev)}
            onMouseLeave={(ev) => functionality.onFrameMouseLeave(ev)}
        >
            <g pointerEvents='stroke'>
                <path
                    d={`M ${graphicData.x} ${graphicData.y} l ${graphicData.width} 0`}
                    stroke='black'
                    strokeWidth='1'
                />
                <path
                    d={`M ${graphicData.x} ${graphicData.y} l 0 ${graphicData.height}`}
                    stroke='black'
                    strokeWidth='1'
                    cursor='ew-resize'
                />
                <path
                    d={`M ${graphicData.x} ${graphicData.y} l 0 ${graphicData.height}`}
                    strokeWidth='6'
                    stroke='transparent'
                    cursor='ew-resize'
                    onMouseDown={() => functionality.onFrameResize(Direction.LEFT)}
                    onDoubleClick={() => functionality.onFrameSetDefaultWidth()}
                />
                <path
                    d={`M ${graphicData.x + graphicData.width} ${graphicData.y} l 0 ${graphicData.height}`}
                    stroke='black'
                    strokeWidth='1'
                    cursor='ew-resize'
                />
                <path
                    d={`M ${graphicData.x + graphicData.width} ${graphicData.y} l 0 ${graphicData.height}`}
                    stroke='transparent'
                    strokeWidth='6'
                    cursor='ew-resize'
                    onMouseDown={() => functionality.onFrameResize(Direction.RIGHT)}
                    onDoubleClick={() => functionality.onFrameSetDefaultWidth()}
                />
                <path
                    d={`M ${graphicData.x} ${graphicData.y + graphicData.height} l ${graphicData.width} 0`}
                    stroke='black'
                    strokeWidth='1'
                />
            </g>
            <g
                onMouseDown={(ev) => functionality.onFrameMove(ev)}
            >
                {props.children}
            </g>
        </g>
    );
};

export default Frame;