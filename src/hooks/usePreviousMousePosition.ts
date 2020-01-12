import * as React from 'react';

const usePreviousMousePosition = () => {
    const [previousMousePosition, setPreviousMousePosition] = React.useState({ x: 0, y: 0 });

    return {
        previousMousePosition,
        setPreviousMousePosition
    };
};

export default usePreviousMousePosition;