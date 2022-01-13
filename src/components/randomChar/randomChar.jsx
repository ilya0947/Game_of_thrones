import React, {Component} from 'react';
import ErrorMessage from '../errorMesage/errorMessage';
import getResours from '../../services/get';
import Spiner from '../spiner/spiner';
import './randomChar.scss';

export default class RandomChar extends Component {

    getRes = new getResours();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        // setTimeout(() => {
        //     console.log(this.state.char)
        // },1000)
    }

    error = (err) => {
        // console.log(err)
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        this.setState({loading: true, error: false});
        
        if(this.state.error) this.setState({error: false});

        const id = Math.floor(Math.random()*100-30);
        // console.log(id)
        this.getRes.getCharacter(id)
            .then(char => this.setState({char, loading:false}))
            .catch(this.error);
    }

    render() {

        const {char, loading, error} = this.state;

        const content = loading ? <Spiner/> : error ? <ErrorMessage/> : <View char={char}/>

        return (
            <div onClick={this.updateChar} className="random-block rounded">
               {content}
            </div>
        );
    }
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )

}
