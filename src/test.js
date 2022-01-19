import React from "react";

export default class Test extends React.Component{
    render() {

        console.log(this.props.children, this.props)
        return <></>
    }
}

const res = (a) => {
    console.log(a, 'b')
    return () => {
        console.log(a, 'c')
    }
}
res()();