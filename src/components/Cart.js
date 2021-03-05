import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        const cartItems = this.props.cartItems;
        console.log(cartItems.length)
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
                                    <div className="cart">
                                    <div className="total">
                                        Total: {
                                        formatCurrency( 
                                            cartItems.reduce((a,c)=>
                                                a+c.price*c.count,0
                                            )
                                        )}
                                    </div>
                                  
                                    <button className="button primary">
                                            Proceed
                                    </button>
                                </div>
                )}

                
            </div>
        )
    }
}
