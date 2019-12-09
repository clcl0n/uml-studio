import IClassElement from '@interfaces/elements/IClassElement';

const updateTable = (table: IClassElement) => {
    table.elementGraphicData.frame.sections.methods.y = table.elementGraphicData.frame.y + (
        (table.elementData.classProperties.length + 1) * table.elementGraphicData.rowHeight
    )

    table.elementGraphicData.frame.height = (
        table.elementData.classProperties.length + table.elementData.classMethods.length + 1
    ) * table.elementGraphicData.rowHeight;
    
    return table;
}

export default updateTable;