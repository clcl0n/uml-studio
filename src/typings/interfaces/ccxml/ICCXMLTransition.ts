export default interface ICCXMLTransition {
    $: {
        head: string;
        tail: string;
        value: string;
        target: string;
        headCoord?: string; // "x:y"
        tailCoord?: string; // "x:y"
        segments?: string; // "x:y:lineToX:lineToY:isStart:isEnd:direction:segmentId:fromSegmentId:toSegmentId;"
        direction?: string;
        type: string;
    };
}