import { Component } from "react";
import ErrorMessage from "../components/errorMesage/errorMessage";
import Spiner from "../components/spiner/spiner";

export default function withData(View, getRes) {

    return class extends Component {
        get = getRes ? getRes : this.props.getRes;
        state = {
            data: null,
            loading: true,
            error: false
        }
        
        componentDidMount() {
            
            this.get()
            .then(data => this.setState({
                data,
                loading: false
                }))
                .catch(() => this.setState({
                    error:true,
                    loading: false
                }));
        }

        render() {

            const {data, loading, error} = this.state


            const dataItems = loading ? <Spiner/> : error ? <ErrorMessage/> : data;

            return <View {...this.props} data={dataItems}/>
        }
    }
}