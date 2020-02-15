import React from 'react';
import ReactDOM from 'react-dom';
import IChoiceElement from '@interfaces/state-diagram/IChoiceElement';
import { useDispatch } from 'react-redux';
import { selectNewElement, isMouseDown, newCanvasOperation } from '@store/actions/canvas.action';
import CanvasOperationEnum from '@enums/canvasOperationEnum';
import Joint from '../../class-diagram/common/joint';

const ChoiceElement = (props: { choiceElement: IChoiceElement }) => {
    const dispatch = useDispatch();
    const { choiceElement } = props;
    const { graphicData } = choiceElement;
    const [joints, setJoints] = React.useState(<g/>);

    const onChoiceClick = () => {
        dispatch(selectNewElement(choiceElement.id));
    };

    const onChoiceMouseDown = () => {
        dispatch(isMouseDown(true));
        dispatch(newCanvasOperation({
            type: CanvasOperationEnum.MOVE_ELEMENT,
            elementId: choiceElement.id
        }));
    };

    const halfWidth = graphicData.width / 2;
    const halfHeight = graphicData.height / 2;

    const setJointsState = () => {
        const jointRadius = 5;
        setJoints(
            <g>
                <Joint key='1' radius={jointRadius} fromElementId={choiceElement.id} x={graphicData.x + halfWidth} y={graphicData.y}/>
                <Joint key='2' radius={jointRadius} fromElementId={choiceElement.id} x={graphicData.x + halfWidth} y={graphicData.y + graphicData.height}/>
                <Joint key='3' radius={jointRadius} fromElementId={choiceElement.id} x={graphicData.x + graphicData.width} y={graphicData.y + halfHeight}/>
                <Joint key='4' radius={jointRadius} fromElementId={choiceElement.id} x={graphicData.x} y={graphicData.y + halfHeight}/>
            </g>
        );
    };

    const clearJointsState = () => {
        setJoints(<g/>);
    };

    return (
        <g
            pointerEvents='all'
            onMouseLeave={() => clearJointsState()}
            onMouseOver={() => setJointsState()}
            onClick={() => onChoiceClick()}
            onMouseDown={() => onChoiceMouseDown()}
        >
            <g
            
            >
                <path
                    stroke='black'
                    fill='transparent'
                    d={`M ${graphicData.x} ${graphicData.y + (graphicData.height / 2)} l ${halfWidth} ${-halfHeight} l ${halfWidth} ${halfHeight} l ${-halfWidth} ${halfHeight} Z`}
                />
                {joints}
            </g>
        </g>
    );
};

export default ChoiceElement;