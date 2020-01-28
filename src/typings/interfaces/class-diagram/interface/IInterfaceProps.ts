import IInterface from './IInterface';
import IInterfaceProperty from './IInterfaceProperty';
import IInterfaceMethod from './IInterfaceMethod';

export default interface IInterfaceProps {
    interface: IInterface;
    properties: Array<IInterfaceProperty>;
    methods: Array<IInterfaceMethod>;
}