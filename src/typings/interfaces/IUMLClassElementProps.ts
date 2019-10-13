import ClassDiagramElementsEnum from '@enums/classDiagramElementsEnum';
import IClassProperty from './IClassProperty';
import IClassMethod from './IClassMethod';

export interface IUMLClassElementProps {
    id: string,
    type: ClassDiagramElementsEnum.TABLE,
    classProperties: Array<IClassProperty>,
    classMethods: Array<IClassMethod>,
    width: number;
    height: number;
    frame: {
        x: number;
        y: number;
    }
    className: {
        x: number,
        y: number,
        text: string
    }
    row: {
        height: number;
    },
    separators: {
        properties: {
            x: number,
            y: number,
        },
        methods: {
            x: number,
            y: number,
        }
    }
}