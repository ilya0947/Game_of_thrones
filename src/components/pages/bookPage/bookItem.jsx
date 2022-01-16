import React, {Component} from 'react';
import getResours from '../../../services/get';
import ItemDetails, { Filed } from '../../itemDetails';


export default class BookItem extends Component {

    getRes = new getResours();
    
    render() {
        // console.log('book item')
        return (
            <>
            <ItemDetails 
                itemRes={this.getRes.getBooks}
                itemId={this.props.id}
                btn>
                    <Filed filed='authors' label='Authors'/>
                    <Filed filed='country' label='Country'/>
                    <Filed filed='publisher' label='Publisher'/>
                    <Filed filed='released' label='Released'/>
            </ItemDetails>
            </>
        );
    }
}