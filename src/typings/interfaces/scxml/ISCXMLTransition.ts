export default interface ISCXMLTransition {
    $: {
        event?: string;
        cond?: string;
        target?: string;
        type: string;
        headCoord: string; // "x:y"
        tailCoord: string; // "x:y"
        segments: string; // "x:y:lineToX:lineToY:isStart:isEnd:direction:segmentId:fromSegmentId:toSegmentId;"
        direction: string;
    };
}