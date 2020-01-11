import IUtility from './IUtility';
import IUtilityProperty from './IUtilityProperty';
import IUtilityMethod from './IUtilityMethod';

export default interface IUtilityProps {
    utility: IUtility;
    properties: Array<IUtilityProperty>;
    methods: Array<IUtilityMethod>;
}