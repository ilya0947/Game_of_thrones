import React, {useEffect, useState} from 'react';
import ErrorMessage from '../errorMesage/errorMessage';
import getResours from '../../services/get';
import Spiner from '../spiner/spiner';
import PropTypes from 'prop-types';
import './randomChar.scss';

export default function RandomChar({interval}) {

    const getRes = new getResours();

    const [state, setState] = useState({
        char: {},
        loading: true,
        error: false
    })


    // static defaultProps = {   //Синтаксис установки пропсов по умолчанию es9
    //     interval: 15000
    // }
    useEffect(() => {
        let tId;
        updateChar();
        // tId = setInterval(this.updateChar, 1600);
        const updateInterval = () => {
            tId = setTimeout(() => {
                updateChar()
                updateInterval();
            }, interval);
        }
        updateInterval();

        return () => clearInterval(tId);
    //eslint-disable-next-line 
    }, []);
  
    const err = (err) => {
        console.log(err)
        setState({...state, loading: false, error: true})
    }

    const updateChar = () => {
        setState({...state, loading: true});
        
        if(state.error) setState({...state, error: false});

        const id = Math.floor(Math.random()*140 + 25);
        // console.log(id)
        getRes.getCharacter(id)
            .then(char => setState(data => ({...data, char, loading:false})))
            .catch(err);
    }

    const {char, loading, error} = state;

    const content = loading ? <Spiner/> : error ? <ErrorMessage/> : <View char={char}/>

    return (
        <div className="random-block rounded">
            {content}
        </div>
    );
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number/* (props, propName, componentName) => { // Вариант без библиотеки
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
