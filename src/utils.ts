export function sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const f = (value: number) => (value + 0.00001)

const getConfig = text => ({
    text: {
        content: text,
        rgb: [255 , 255, 255],
        textOutline: true,
        scaleMultiplier: 1,
        font: 0,
    },
    perspectiveScale: 4,
    radius: 5000
});

export function drawText(x: number, y: number, z: number, text: string, timeout = 7500) {

    console.log('drawing', text)
    exports.motiontext.Draw3DTextTimeout({
        ...getConfig(text),
        xyz: { x, y, z},
        timeout
    });
}

export  function drawTextStatic(x: number, y: number, z: number, text: string) {
    exports.motiontext.Draw3DText({
        ...getConfig(text),
        xyz: { x, y, z},
    });
}

export function isWithinRange({ x, y, z}, minDistance = 3): boolean {
    const playerPos = GetEntityCoords(PlayerPedId(), true);
    const distance = GetDistanceBetweenCoords(
        playerPos[0],
        playerPos[1],
        playerPos[2],
        x,
        y,
        z,
        true
    )
    return distance < minDistance;
}