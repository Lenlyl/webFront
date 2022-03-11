export default class LYLPromise {
    constructor(handle) {
        this['[[PromiseState]]'] = 'pending';
        this['[[PromiseResult]]'] = undefined;
        // this.onResolveFn = undefined;
        // this.onRejectFn = undefined; //单个then
        this.resolveFnQueue = [];
        this.rejectFnQueue = []; //多个then
        handle(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(val) {
        this['[[PromiseState]]'] = 'fulfilled';
        this['[[PromiseResult]]'] = val;
        // this.onResolveFn && this.onResolveFn(val); //单个then
        let ob;
        let run = () => {
            let cb;
            while (cb = this.resolveFnQueue.shift()) {
                //1.解决多个then问题
                cb && cb(val)
            }
            ob.disconnect();
        }
        // setTimeout(run);//2.解决执行顺序问题
        //3.解决微任务宏任务问题，用MutationObserver
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute('lyl', 'myPromise')
    }

    _reject(err) {
        this['[[PromiseState]]'] = 'rejected';
        this['[[PromiseResult]]'] = err;
        // this.onRejectFn && this.onRejectFn(err);//单个then
        let ob;
        let run = () => {
            let cb;
            while (cb = this.rejectFnQueue.shift()) {
                cb && cb(err)
            }
            ob.disconnect();
        }
        // setTimeout(run);
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute('lyl', 'myPromise')
    }

    then(onResolve, onReject) {
        //单个then
        // this.onResolve = onResolve;
        // this.onReject = onReject; 

        //1.多个then
        // this.resolveFnQueue.push(onResolve);
        // this.rejectFnQueue.push(onReject);

        //链式调用问题解决
        return new LYLPromise((resolve, reject) => {

            let resolveFn = function(val) {
                let onResolveResult = onResolve(val);
                if(onResolveResult instanceof LYLPromise){
                    console.log('是LYLPromise对象');
                    // onResolveResult.then(res => {
                    //     resolve(res)
                    // })
                    onResolveResult.then(resolve);
                }else{
                    resolve(onResolveResult);
                }
            }
            this.resolveFnQueue.push(resolveFn);

            let rejectFn = function(err) {
                let onRejectResult = onReject(err);
                if(onRejectResult instanceof LYLPromise){
                    console.log('是LYLPromise对象');
                    // onRejectResult.then(res => {
                    //     reject(res)
                    // })
                    onRejectResult.then(reject);
                }else{
                    reject(onRejectResult)
                }
            }
            this.rejectFnQueue.push(rejectFn);
        });
    }

    finally(fn){
        this.then(fn,fn)
    }

    static resolve(val) {
        return new LYLPromise(resolve => {
            resolve(val);
        })
    }

    static reject(err) {
        return new LYLPromise((resolve, reject) => {
            reject(err)
        })
    }
}