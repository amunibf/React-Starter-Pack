import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { v4 as uuidv4 } from 'uuid'
import {connect} from 'react-redux'
import { getItems, deleteItem } from "../actions/itemAction";
import PropTypes from 'prop-types'


class ShoppingList extends Component {
    /* state = {
        items : [
            {id : uuidv4(), name : 'Eggs'},
            {id : uuidv4(), name : 'Milk'},
            {id : uuidv4(), name : 'Steak'},
            {id : uuidv4(), name : 'Water'},
        ]
    } */

    static propTypes = {
        getItems : PropTypes.func.isRequired,
        deleteItem : PropTypes.func.isRequired,
        item : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool
    }
    
    componentDidMount() {
        this.props.getItems()
    }

    onDeleteClick= id =>{
        this.props.deleteItem(id)
    }
    
    render() {
        // const { items } = this.state
        const { items } = this.props.item
        return (
            <Container>
                {/* <Button
                color="dark"
                style={{marginBottom :'2rem'}}
                onClick={()=>{
                    const name = prompt('Enter Item!')
                    if(name){
                        this.setState(
                            state=>({items : [...state.items, { id : uuidv4(), name}]})
                        )
                    }
                }}
                >Add Item</Button> */}
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({_id, name})=>(
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            { this.props.isAuthenticated ?
                            <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick = {this.onDeleteClick.bind(this,_id)}
                            // onClick={()=>{
                            //     this.setState(state=>({
                            //         items : state.items.filter(item => item.id !== id)
                            //     }))
                            // }}
                            >
                                &times;
                            </Button> : null
                            }
                            
                            {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>({
    item : state.item,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, 
    {getItems, deleteItem})(ShoppingList)
