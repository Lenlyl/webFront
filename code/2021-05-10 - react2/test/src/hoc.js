import React from 'react';

function HOC(Component) {
    return class wrapComponent extends React.Component{
        constructor(){
            super()
            this.state = {
                name : 'hoc name'
            }
        }

        render = () => {
            return <Component {...this.props} {...this.state}/>
        }
    }
}

export default HOC;