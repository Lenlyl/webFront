export default class KPromise {
    constructor(handle) {
        this['[[PromiseState]]'] = "pending";
        this['[[PromiseResult]]'] = undefined;
        // handle((val)=>{
        //     //resolve
        //     this['[[PromiseState]]'] = "fulfilled";
        //     this['[[PromiseResult]]'] = val;
        // },(err)=>{
        //     // reject
        //     this['[[PromiseState]]'] = "rejected";
        //     this['[[PromiseResult]]'] = err;
        // });
        // console.log(this);
        // this.resolveFn = undefined;
        // this.rejectFn = undefined;

        this.resolveFnQueue = [];
        this.rejectFnQueue = [];
        handle(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(val) {
        // console.log(1);
        // console.log(this);
        let ob;
        this['[[PromiseState]]'] = "fulfilled";
        this['[[PromiseResult]]'] = val;
        // this.resolveFn && this.resolveFn(val);
        // [fn1,fn2....];
        const run = () => {
            let cb;
            while (cb = this.resolveFnQueue.shift()) {
                cb && cb(val);
            }
            ob.disconnect();
        }
        // setTimeout(run);
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        });
        document.body.setAttribute("kkb", "value");
        // ob.disconnect();
    }
    _reject(err) {
        // reject
        let ob;
        this['[[PromiseState]]'] = "rejected";
        this['[[PromiseResult]]'] = err;
        // this.rejectFn && this.rejectFn(err);
        const run = () => {
            let cb;
            while (cb = this.rejectFnQueue.shift()) {
                cb && cb(err);
            }
            ob.disconnect();
        }
        // setTimeout(run);
        ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        });
        document.body.setAttribute("kkb", "value");

    }
    then(onResolve, onReject) {
        // console.log(2);
        // onResolve(this['[[PromiseResult]]']);
        // onReject();
        // this.resolveFn = onResolve;
        // this.rejectFn = onReject;
        // onResolve 哪种返还值？onResolve();
        // this.resolveFnQueue.push(onResolve);
        // this.rejectFnQueue.push(onReject);
        return new KPromise((resolve, reject) => {
            let resolveFn = function (val) {
                let resolveResult = onResolve(val);
                // 判断resolveResult 是否是KPromise对象
                if (resolveResult instanceof KPromise) {
                    // KPromise对象 ---》获取值 设置成返还KPromise的 [[PromiseResult]]；
                    console.log("是KPromise对象")
                    // resolveResult.then(res=>{
                    //     resolve(res);
                    // })
                    resolveResult.then(resolve);
                } else {
                    resolve(resolveResult);
                }

            }
            this.resolveFnQueue.push(resolveFn);

            let rejectFn = function (err) {
                let rejectResult = onReject(err);
                if (rejectResult instanceof KPromise) {
                    rejectResult.then(reject);
                } else {
                    reject(rejectResult);
                }
            }
            this.rejectFnQueue.push(rejectFn);
        })
    }

    static resolve(val) {
        return new KPromise(resolve => {
            resolve(val);
        })
    }
    static reject(err){
        return new KPromise((resolve,reject)=>{
            reject(err);
        })
    }
    static race(lists){
        // [p1,p2,p3];
        return new KPromise((resolve,reject)=>{
                lists.forEach(p=>{
                    p.then(res=>{
                        resolve(res);
                    },err=>{
                        reject(err);
                    })
                })
        })
    }
    static all(lists){
        return new KPromise(reslove=>{
            let num = 0;
            let resAll = [];
            lists.forEach(p=>{
                p.then(res=>{
                    resAll.push(res);
                    num++;
                    // reslove(resAll)
                    if(num>=lists.length){
                        reslove(resAll);
                    }
                })
            })

        })
    }

    static allSettled(lists){
        return new KPromise((resolve)=>{
            let resArr = new Array(lists.length);
            let num = 0;
            lists.forEach((p,key)=>{
                let obj = {};
                p.then(res=>{
                    obj['status'] = "fulfilled";
                    obj['value'] = res;
                    resArr[key] = obj;
                    num++;
                    if(num>=lists.length){
                        resolve(resArr);
                    }
                },err=>{
                    obj['status'] = "rejected";
                    obj['reason'] = err;
                    resArr[key] = obj;
                    num++;
                    if(num>=lists.length){
                        resolve(resArr);
                    }
                })

            })
        })
    }
    finally(fn){
        // fn();
        this.then(fn,fn);
    }

}