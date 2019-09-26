const classSVG = (x: number, y: number, width: number, height: number, style?: string): SVGGElement => {
    const umlClass = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const umlClassFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    umlClassFrame.setAttributeNS(null, 'x', (x - (width / 2)).toString());
    umlClassFrame.setAttributeNS(null, 'y', (y - (height / 2)).toString());

    umlClassFrame.setAttributeNS(null, 'width', width.toString());
    umlClassFrame.setAttributeNS(null, 'height', height.toString());

    umlClassFrame.setAttributeNS(null, 'style', 'cursor:move;fill:transparent;stroke-width:1;stroke:rgb(0,0,0)');

    // name
    const umlClassName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    umlClassName.setAttributeNS(null, 'font-family', 'Helvetica');
    umlClassName.setAttributeNS(null, 'font-size', '12');
    umlClassName.setAttributeNS(null, 'text-anchor', 'middle');
    umlClassName.setAttributeNS(null, 'x', x.toString());
    umlClassName.setAttributeNS(null, 'y', (y - (height / 2) + 12 + 5).toString());
    umlClassName.innerHTML = 'test-test-test-test';

    // separator
    const nameAttrSeparator = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    nameAttrSeparator.setAttributeNS(null, 'x1', (x - (width / 2)).toString());
    nameAttrSeparator.setAttributeNS(null, 'y1', (y - 25).toString());

    nameAttrSeparator.setAttributeNS(null, 'x2', (x + (width / 2)).toString());
    nameAttrSeparator.setAttributeNS(null, 'y2', (y - 25).toString());
    nameAttrSeparator.setAttributeNS(null, 'stroke', 'black');
    // attributes

    // methods

    const umlClassHead = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    const newTable = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // newTable.setAttributeNS(null, 'x', (x - (width / 2)).toString());
    // newTable.setAttributeNS(null, 'y', (y - (height / 2)).toString());

    // newTable.setAttributeNS(null, 'width', width.toString());
    // newTable.setAttributeNS(null, 'height', height.toString());

    // newTable.setAttributeNS(null, 'rx', rx.toString());
    // newTable.setAttributeNS(null, 'ry', ry.toString());
    // newTable.setAttributeNS(null, 'style', 'fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)');

    umlClass.append(umlClassFrame);

    const umlHeadContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    umlHeadContainer.append(umlClassName);
    umlHeadContainer.append(nameAttrSeparator);
    umlClass.append(umlHeadContainer);

    return umlClass;
};

export default classSVG;