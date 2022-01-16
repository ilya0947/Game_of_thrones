import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMesage/errorMessage';
import Spiner from '../spiner/spiner';
import './itemDetails.scss';


class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            // console.log('componentDidUpdate',this.props.charId)
            this.updateItem();
        }
    }

    error = (err) => {
        this.setState({
            loading: false,
            error: true,
            item: true
        })
    }

    updateItem = () => {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }
        this.setState({loading: true});
        
        if(this.state.error) this.setState({error: false});
        this.props.itemRes(itemId)
        .then(item => this.setState({item, loading: false}))
        .catch(this.error);
        // this.error.test = 1;
    }
    
    render() {
        
        const {item, loading ,error} = this.state;
        const {history:{goBack, location:{pathname}}, itemId, itemPreviwe, children: propChil} = this.props;
        const mess = <span className='select-error'>{itemPreviwe}</span>;
        
        const children = React.Children.map(propChil, child => {
            return React.cloneElement(child, {item})
        });
        // console.log(children[0].props.item)
        // console.log(loading)

        const content = loading ? <Spiner/> : error ? <ErrorMessage/> : <View children={children} item={item}/>;

        if(!item) {
            return mess;
        }

        const back = pathname === '/books/' + itemId ? 
        <Button className='mt-2' onClick={goBack}>Back</Button> : null;

        return (
            <>
                {back}
                <div className="char-details rounded">
                    {content}
                </div>
            </>
        );
    }
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