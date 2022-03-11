import { useScrollY } from "./useScrollY";


function App() {
    const y = useScrollY();
    return (
        <>
            <style>
                {
                    `
                    .box div {
                        margin: 20px;
                        width: 200px;
                        height: 200px;
                        border: 2px solid #000;
                        font-sise: 40px;
                        text-align: center;
                        line-height: 200px;
                    }
                    .box span {
                        position: fixed;
                        left: 0;
                        top: 50%;
                        width: 100px;
                        font: 18px/2 "宋体";
                        text-align: center;
                        background: #000;
                        color: #fff;
                    }
                    `
                }
            </style>
            <div className="box">
                {
                    new Array(20).fill('商品').map((item, i) => {
                        return <div key={i}>{item + (i+1)}</div>
                    })
                }
                <span>{y}</span>
            </div>
        </>
    )
}

export default App;
