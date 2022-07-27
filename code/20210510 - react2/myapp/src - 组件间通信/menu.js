import { Component } from "react";
class Menu extends Component {
  render(){
    const {data,name,openName,changeOpen} = this.props;
    const {title,list} = data;
    //console.log(name,openName);
    return <dl className={`friend-group ${name===openName?"expanded":""}`}>
        <dt onClick={()=>{
          changeOpen(name===openName?"":name);
        }}>{title}</dt>
        {list.map((item,index)=><dd key={index}>{item.name}</dd>)}
    </dl>
  }
}
export default Menu;