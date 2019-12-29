import IClass from '../class/IClass';
import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IFrame from '../common/IFrame';
import IClassFrameSections from '../class/IClassFrameSections';

export default interface IUtility {
    id: string;
    type: ClassDiagramElementsEnum;
    className: string;
    graphicData: {
        frame: IFrame;
        sections: IClassFrameSections
    };
    utilityPropertyIds: Array<string>;
    utilityMethodIds: Array<string>;
}