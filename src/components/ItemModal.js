import React, { Component } from 'react'
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
 } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import PropTypes from 'prop-types'
// import { v4 as uuidv4 } from 'uuid'


class ItemModal extends Component {
    state = {
        modal : false,
        name : ''
    }

    static propTypes = {
        isAuthenticated : PropTypes.bool
    }

    toggle = () =>{
        this.setState({
            modal : !this.state.modal
        })
    }

    onChange = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = e =>{
        e.preventDefault()
        
        const newItem = {
            // id : uuidv4(),
            name : this.state.name
        }

        //Add item via add item action
        this.props.addItem(newItem)

        //close modal
        this.toggle()
    }

    render() {
        return (
            <div>
            { this.props.isAuthenticated ?
            <Button
            color="dark"
            style={{marginBottom : "2rem"}}
            onClick={this.toggle}
            >Add Item</Button>
             : <h4 className="mb-3 ml-4">Please log in to manage items!</h4>}
            
            <Modal
            isOpen={this.state.modal}
            toggle={this.state.toggle}>
                <ModalHeader
                toggle={this.toggle}>
                    Add To Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                            type="text"
                            name="name"
                            id="item"
                            placeholder="Add shopping item!"
                            onChange={this.onChange}
                            />
                        </FormGroup>
                        <Button
                        color="primary"
                        style={{marginTop:"2rem"}}
                        block
                        >Add Item</Button>
                    </Form>
                </ModalBody>
            </Modal>
                
            </div>
        )
    }
}

const mapStateToProp = state =>({
    item : state.item,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProp,{addItem})(ItemModal)
