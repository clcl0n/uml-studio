import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IFrame from '@interfaces/class-diagram/common/IFrame';
import IClassFrameSections from './IClassFrameSections';

export default interface IClass {
    id: string;
    type: ClassDiagramElementsEnum;
    className: string;
    graphicData: {
        frame: IFrame;
        sections: IClassFrameSections
    };
    classPropertyIds: Array<string>;
    classMethodIds: Array<string>;
}