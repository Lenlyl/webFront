
interface IObj {
    [key: string]: number
}
function merge(target: IObj, ...others: Array<IObj>) {
    return Object.assign(target, ...others);
}  