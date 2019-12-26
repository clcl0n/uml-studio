import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';

export default interface IClass {
    id: string;
    type: ClassDiagramElementsEnum;
    className: string;
    rowHeight: number;
    width: number;
    height: number;
    x: number;
    y: number;
    xCenter: number;
    yCenter: number;
    sections: {
        head: {
            y: number;
        },
        properties: {
            y: number;
        }
        methods: {
            y: number;
        }
    };
    fontPixelSize: number;
    fontMargin: number;
    classPropertyIds: Array<string>;
    classMethodIds: Array<string>;
}