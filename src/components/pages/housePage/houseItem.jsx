import React, {Component} from 'react';
import getResours from '../../../services/get';
import ItemDetails, { Filed } from '../../itemDetails';
export default class HouseItem extends Component {

    getRes = new getResours();
    
    render() {
        // console.log(this.props.id)
        return (
            <>
            <ItemDetails 
                itemRes={this.getRes.getHouses}
                itemId={this.props.id}>
                    <Filed filed='currentLord' label='Current Lord'/>
                    <Filed filed='region' label='Region'/>
                    <Filed filed='founded' label='Founded'/>
                    <Filed filed='founder' label='Founder'/>
            </ItemDetails>
            </>
        );
    }
}