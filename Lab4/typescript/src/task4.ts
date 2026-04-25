export {};

type Point = {
    x: number;
    y: number;
};

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(p1: Point, p2: Point): number;
function distance(
    arg1: number | Point,
    arg2: number | Point,
    arg3?: number,
    arg4?: number
): number {
    if (
        typeof arg1 === 'number' &&
        typeof arg2 === 'number' &&
        arg3 !== undefined &&
        arg4 !== undefined
    ) {
        const dx = arg3 - arg1;
        const dy = arg4 - arg2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (typeof arg1 === 'object' && typeof arg2 === 'object') {
        const dx = arg2.x - arg1.x;
        const dy = arg2.y - arg1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    throw new Error('distance: переданы аргументы не той формы');
}

console.log(distance(0, 0, 3, 4));
console.log(distance({ x: 1, y: 2 }, { x: 4, y: 6 }));
