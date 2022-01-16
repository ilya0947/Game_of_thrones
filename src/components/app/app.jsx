import './app.scss';
import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import BookPage from '../pages/bookPage/bookPage';
import CharacterPage from '../pages/characterPage/characterPage';
import HousePage from '../pages/housePage/housePage';
import RandomChar from '../randomChar';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import BookItem from '../pages/bookPage/bookItem';



export default class App extends React.Component{
    
    state = {
        toggleRC: true,
        
    }

    onToggleRC = () => {
        this.setState((state) => {
            return {
                toggleRC: !state.toggleRC
            };
        });
    }

    render() {
        const {toggleRC} = this.state

        const randomChar = toggleRC ? <RandomChar interval={15000}/> : null;
        

        return (
            <> 
                <Router>    
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <Button  colir='info' onClick={this.onToggleRC}>Random char toggle</Button>
                                {randomChar}
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' exact component={() => <h1 className='not-found'>Database for Game of Thrones</h1>}/>
                            <Route path='/characters/'>
                                <CharacterPage/>
                            </Route>
                            <Route path='/houses/' exact>
                                <HousePage/>
                            </Route> 
                            <Route exact path='/books/'>
                                <BookPage/>
                            </Route>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id}  = match.params;
                                    return <BookItem id={id}/>
                                }
                            }/>
                            <Route component={() => {
                            return (
                                <>
                                <Link className='mt-2 btn btn-secondary' to='/'>To main</Link>
                                <h1 className="not-found">Not found</h1>
                            </>
                            )
                        }}/>
                        </Switch>
                    </Container>
                </Router>
            </>
        );
    }
};