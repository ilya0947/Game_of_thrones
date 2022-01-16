import React from "react";

export default class Test extends React.Component{
    render() {

        console.log(this.props.children, this.props)
        return <></>
    }
}

const res = 'test';

console.log(res.split('')[0]);




