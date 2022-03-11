import { memo } from "react"
import { connect } from "react-redux";
import Count from "./count"
import Todo from "./todo"

function func(props) {
    console.log(props);
    return (
        <>
            <Count />
            <hr />
            <Todo />
        </>
    )
}

const App = memo(func);
/**
 * 7 之前使用
 */
// const withConnect = connect(state => ({count: state.count}))
// const newApp = withConnect(App);
export default App;