export default class LPromise {
    constructor(handle){
        this['[[PromiseState]]'] = 'pending';
        this['[[PromiseResult]]'] = undefined;

        handle((value) => {
            //resolve
            this['[[PromiseState]]'] = 'fulfilled';
            this['[[PromiseResult]]'] = value;
            
        }, (err) => {
            //reject
            this['[[PromiseState]]'] = 'rejected';
            this['[[PromiseResult]]'] = err;
        })
    }
    
}