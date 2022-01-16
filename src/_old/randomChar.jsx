import React, {Component} from 'react';
import ErrorMessage from '../errorMesage/errorMessage';
import getResours from '../../services/get';
import Spiner from '../spiner/spiner';
import PropTypes from 'prop-types';
import './randomChar.scss';

export default class RandomChar extends Component {

    getRes = new getResours();

    state = {
        char: {},
        loading: true,
        error: false
    }

    // static defaultProps = {   //Синтаксис установки пропсов по умолчанию es9
    //     interval: 15000
    // }

    componentDidMount() {
        this.updateChar();
        // this.tId = setInterval(this.updateChar, 1600);
        this.i = 0;
        const tId = () => {
            // this.i++;
            // console.log('interval: '+ this.i);
            this.tId = setTimeout(() => {
                this.updateChar()
                tId();
            }, this.props.interval);
        }
        tId();
    }

    componentWillUnmount() {
        clearInterval(this.tId);
    }

    error = (err) => {
        // console.log(err)
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        this.setState({loading: true});
        
        if(this.state.error) this.setState({error: false});

        const id = Math.floor(Math.random()*140 + 25);
        // console.log(id)
        this.getRes.getCharacter(id)
            .then(char => this.setState({char, loading:false}))
            .catch(this.error);
    }

    render() {

        const {char, loading, error} = this.state;

        const content = loading ? <Spiner/> : error ? <ErrorMessage/> : <View char={char}/>

        return (
            <div className="random-block rounded">
               {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes/* (props, propName, componentName) => { // Вариант без библиотеки
        const value = props[propName];

        if (typeof value === 'number' && !isNaN(value)) {
            return null;
        }
        return new TypeError(`${componentName}: ${propName} muts to be a number`)
    } */
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
