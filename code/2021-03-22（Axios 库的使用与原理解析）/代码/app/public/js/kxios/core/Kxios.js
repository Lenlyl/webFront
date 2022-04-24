/**
 * Kxios的核心类，所有的请求和响应功能都是该类提供的
 */

class InterceptorManager {

    constructor() {
        this.handlers = [];
    }

    use(fulfilled, rejected) {
        this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected
        });
    }
}

class Kxios {

    constructor(config) {
        // console.log('Kxios');
        // defaults 配置实际上基于当前对象发送请求的一些通用参数
        this.defaults = config;

        // 拦截器对象
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }

    /**
     * request
     *  处理发送请求的具体方法
     */
    request(config) {

        // 把默认的配置对象与当前request方法传入的配置对象进行一个合并
        // 后续请求解析等都会基于这个合并后的配置进行
        // ? 为什么要弄这么多配置: 因为我们通常会依赖一个kxios对象去发送不同参数（url、method）的请求，这个时候，我们需要对配置进行一个划分，通用配置/请求配置
        // ? 为什么不直接使用 Object.assign 而是有一个axios 自己内部实现的 mergeConfig 的方法：因为不同的配置合并的策略并不一样
        config = Object.assign({}, this.defaults, config);

        // Set config.method
        if (config.method) {
            config.method = config.method.toLowerCase();
        } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase();
        } else {
            config.method = 'get';
        }

        // console.log(config);


        let chain = [this.dispatchRequest, undefined];

        let promise = Promise.resolve(config);

        // 把请求拦截器中的函数添加到 promise 的任务链中
        // this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        //     chain.unshift(interceptor.fulfilled, interceptor.rejected);
        // });
        // console.log('this.interceptors.request.handlers', this.interceptors.request.handlers);

        // handlers = [{r1, undefined}, {r2, undefined}]

        this.interceptors.request.handlers.forEach(handler => {
            chain.unshift(handler.fulfilled, handler.rejected);
        });

        // chain = [r2, undefined, r1, undefined, dispatchRequest, undefined]


        // handlers = [{rs1, undefined}, {rs2, undefined}]
        this.interceptors.response.handlers.forEach(handler => {
            chain.push(handler.fulfilled, handler.rejected);
        });

        // chain = [r2, undefined, r1, undefined, dispatchRequest, undefined, rs1, undefined, rs2, undefined]

        // promise = promise.then(chain.shift(), chain.shift());
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        // promise.then(() => {
        //     console.log('完成请求')
        // });

        return promise;
    }

    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open(config.method, config.url);

            xhr.onload = function () {
                // console.log('onload', this.responseText);
                // resolve(this.responseText);

                resolve({
                    data: this.responseText,
                    status: this.status
                })
            }

            xhr.send();
        })
    }
}



export default Kxios;