import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';




export default class App extends React.Component{

    state = {
        toggleRC: true
    }

    onToggleRC = () => {
        this.setState({toggleRC: !this.state.toggleRC})
    }

    render() {
        const {toggleRC} = this.state

        const randomChar = toggleRC ? <RandomChar/> : null;
        

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button colir='info' onClick={this.onToggleRC}>Toggle</Button>
                            {randomChar}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};