import React from 'react';
import ItemDetails, { Filed } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMesage/errorMessage';
import ItemList from '../../itemList';
import RowBlock from '../../rowBlock/rowBlock';
import getResours from '../../../services/get';
import './characterPage.scss';



export default class CharacterPage extends React.Component{

    getRes = new getResours();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render(){

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList getRes={this.getRes.getAllCharacters} 
                onItemSelected={this.onCharSelected}
                renderItem={({name, gender}) => (<><span>{name}:</span><span>{gender}</span></>)}/>
        );
        const charDetails = (
            <ItemDetails 
                itemRes={this.getRes.getCharacter}
                itemId={this.state.selectedChar}
                itemPreviwe={'Select character'}>
                    <Filed filed='gender' label='Gender'/>
                    <Filed filed='born' label='Born'/>
                    <Filed filed='died' label='Died'/>
                    <Filed filed='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails}/>
        );
    }
}