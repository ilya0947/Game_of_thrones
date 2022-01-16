import './housePage.scss';
import React from 'react';
import ErrorMessage from '../../errorMesage/errorMessage';
import ItemList from '../../itemList';
import getResours from '../../../services/get';
import { withRouter } from 'react-router-dom';
import ItemDetails, { Filed } from '../../itemDetails';
import RowBlock from '../../rowBlock/rowBlock';

class HousePage extends React.Component{

    getRes = new getResours();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
        });
    }

    render(){
        // console.log(this.setState)

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList = (
            <ItemList getRes={this.getRes.getAllHouses} 
                onItemSelected={this.onHouseSelected}/>
        );

        const houseDetalis = (
            <ItemDetails 
                itemRes={this.getRes.getHouses}
                itemId={this.state.selectedHouse}
                itemPreviwe={'Choose house'}>
                <Filed filed='currentLord' label='Current Lord'/>
                <Filed filed='region' label='Region'/>
                <Filed filed='founded' label='Founded'/>
                <Filed filed='founder' label='Founder'/>
            </ItemDetails>
        );



        // console.log(this.props.match)
            return (
                <RowBlock left={itemList} right={houseDetalis}/>
            // <ItemList getRes={this.getRes.getAllHouses}
            //     onItemSelected={id => {
            //         this.props.history.push(id);
            //     }}
            //    />
        );
    }
}

export default withRouter(HousePage);