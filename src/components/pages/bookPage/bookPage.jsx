import './bookPage.scss';
import React from 'react';
import ErrorMessage from '../../errorMesage/errorMessage';
import ItemList from '../../itemList';
import getResours from '../../../services/get';
import { withRouter } from 'react-router-dom';

class BookPage extends React.Component{

    getRes = new getResours();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render(){

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return (
            <ItemList getRes={this.getRes.getAllBooks}
                onItemSelected={id => {
                    this.props.history.push(id);
                }}
                renderItem={({name}) => (<span>{name}</span>)}/>
        );
    }
}

export default withRouter(BookPage);