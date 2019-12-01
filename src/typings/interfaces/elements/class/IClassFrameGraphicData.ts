export default interface IClassFrameGraphicData {
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
    }
}