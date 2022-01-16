import withData from '../../HOC/withData';
import getResours from '../../services/get';
import PropTypes from 'prop-types';
import './itemList.scss';
function ItemList(props) {

    const renderItem = (arr) => {
        return arr.map(item => {
            const {renderItem: renderLabel} = props;
            const id = item.url.slice(-2).replace(/\//, '');
            const label = renderLabel(item);

            // console.log(id)
            return (
                <li key={id}
                    onClick={() => props.onItemSelected(id)}
                    className="list-group-item d-flex justify-content-between">
                    {label}
                </li>
            );
        })
    }

    const {data} = props;
    const content = !data.$$typeof ? renderItem(data) : data;
    
    return (
        <ul className="item-list list-group">
            {content}
        </ul>
    );
}

ItemList.defaultProps = {
    onItemSelected: () => alert("Данные для перехода на страницу не были переданы"),
    renderItem: item => item.name,
    data: {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

const {getAllBooks} = new getResours();

export default withData(ItemList, getAllBooks);