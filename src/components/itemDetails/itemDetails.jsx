import React, { useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMesage/errorMessage';
import Spiner from '../spiner/spiner';
import './itemDetails.scss';


function ItemDetails(props) {
    const {itemId, btn, itemRes, itemPreviwe, children, history:{goBack}} = props;
    // console.log(props);

    const [state, setState] = useState({
        item: null,
        loading: true,
        error: false
    });

    // console.log(this.props)

    useEffect(() => {
       
        updateItem();
 //eslint-disable-next-line 
    }, [itemId]); 

    const err = (err) => {
        setState({
            loading: false,
            error: true,
            item: true
        })
    }

    const updateItem = () => {
        if (!itemId) {
            return;
        }
        setState(data => ({...data, loading: true}));
        
        if(state.error) setState(data => ({...data, error: false}));
        itemRes(itemId)
        .then(item => setState(data => ({...data, item, loading: false})))
        .catch(err);
        // this.error.test = 1;
    }
        
    const {item, loading, error} = state;
    const mess = <span className='select-error'>{itemPreviwe}</span>;
    
    const propsChil = React.Children.map(children, child => {
        return React.cloneElement(child, {item})
    });

    const content = loading ? <Spiner/> : error ? <ErrorMessage/> : <View children={propsChil} item={item}/>;

    if(!item) {
        return mess;
    }

    const back = btn ? 
    <Button className='mt-2' onClick={goBack}>Back</Button> : null;
// console.log('item details')
    return (
        <>
            {back}
            <div className="char-details rounded">
                {content}
            </div>
        </>
    );
}

export default withRouter(ItemDetails);

export function Filed({item, filed, label}) {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[filed]}</span>
        </li>
    )
}

function View({item, children}) {
    
    const {name} = item;

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {children}
            </ul>
        </>
    )
}