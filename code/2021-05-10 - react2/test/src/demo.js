/* memo包裹的组件，就给该组件加了限制更新的条件，是否更新取决于memo第二个参数返回的boolean值， */
const DemoMemo = connect(state =>
    ({ goodList: state.goodList })
)(memo(({ goodList, dispatch, }) => {
    useEffect(() => {
        dispatch({
            name: 'goodList',
        })
    }, [])
    return <Select placeholder={'请选择'} style={{ width: 200, marginRight: 10 }} onChange={(value) => setSeivceId(value)} >
        {
            goodList.map((item, index) => <Option key={index + 'asd' + item.itemId} value={item.itemId} > {item.itemName} </Option>)
        }
    </Select>
    /* 判断之前的goodList 和新的goodList 是否相等，如果相等，
    则不更新此组件 这样就可以制定属于自己的渲染约定 ，让组件只有满足预定的下才重新渲染 */
}, (pre, next) => is(pre.goodList, next.goodList)))