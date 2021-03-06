import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            adress:"",
            showCheckout:false
        }
    }

    handleInput=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    createOrder=(event)=>{
        event.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            adress:this.state.adress,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order)
    }


    render() {
        const cartItems = this.props.cartItems;
        return (
            <div>
                {
                cartItems.length==0 ? (<div className="cart cart-header">Cart is empty</div>):
                    (<div className="cart cart-header">You have {cartItems.length} elements in your cart</div>
                    )
                }

                <div className="cart-items">
                    <ul>
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                <div>
                                  <img src={item.image} alt={item.title} width="50px" height="auto"></img>
                                </div>
                                
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)}x{item.count}{" "}
                                         <button className="button" onClick={()=>this.props.removeCartItem(item)}> Remove</button>
                                    </div>
                                    
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </div>

                {cartItems.length !==0 &&(
                    <div>
                                    <div className="cart">
                                    <div className="total">
                                        Total: {
                                        formatCurrency( 
                                            cartItems.reduce((a,c)=>
                                                a+c.price*c.count,0
                                            )
                                        )}
                                    </div>
                                  
                                    <button className="button primary" onClick={()=>{
                                                                                    this.setState({showCheckout:true})  
                                                                                }}>
                                            Proceed
                                    </button>
                                </div>
                                <div>
                                     {this.state.showCheckout==true &&(
                                        <div className="cart">
                                            <form onSubmit={this.createOrder}>
                                                <ul className="form-container">
                                                    <li>
                                                        <label>Email</label>
                                                        <input name="email" type="email" onChange={this.handleInput}>

                                                        </input>
                                                    </li>
                                                    <li>
                                                        <label>Name</label>
                                                        <input name="name" type="text" onChange={this.handleInput}>
                                                            
                                                        </input>
                                                    </li>
                                                    <li>
                                                        <label>Adress</label>
                                                        <input name="adress" type="text" onChange={this.handleInput}>
                                                            
                                                        </input>
                                                    </li>
                                                    <li>
                                                        <button className="button primary" type="submit">Checkout</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                      )}
                                </div>
                    </div>

                                
                               
                )}

                
            </div>
        )
    }
}
