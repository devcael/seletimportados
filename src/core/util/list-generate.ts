
export function ListGenerate<T>(index: number, fn: (index: number) => T): T[] {
    let bufferArray: T[] = [];
    for (let curr = 0; curr < index; curr++) {
        const currCall: T = fn(curr);
        bufferArray.push(currCall);
    }
    return bufferArray;
}

