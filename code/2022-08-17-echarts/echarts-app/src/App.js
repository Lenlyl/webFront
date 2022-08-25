import { useEffect } from 'react';
import './App.css';
import * as echarts from 'echarts';

function App() {

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('App'));
    // window.onresize = function() {
    //   myChart.resize();
    // };
    // 绘制图表
    myChart.setOption({
      title: {
        // text: 'ECharts\n入门示例',
        text: 'ECharts 入门示例',
        textAlign: 'right',
        subtext: '副标题',
        // show: false
        link: 'https://echarts.apache.org/zh/option.html#title',
        // sublink: '',
        // target: 'self',
        textStyle: {
          color: 'red',
          // fontStyle: 'oblique'
          fontStyle: 'italic',
          // textBorderColor: 'blue',
          // textBorderWidth: 1,
          // width: 50,
          // overflow: 'truncate'
        },
        subtextStyle: {
          verticalAlign: 'top'
        },
      },

      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        boundaryGap: 0,
        axisLabel: {
          rotate: 90,
          margin: 20
        }
      },
      yAxis: {

      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 40, 70, 100],
          smooth: true,
          itemStyle: {
            color: '#00acec'
          },
          areaStyle: {
            color: '#00acec',
            opacity: 0.2
          }
        }
      ],

    });
  }, [])

  return (
    <div id="App">

    </div>
  );
}

export default App;
