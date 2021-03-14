import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal';
import {fetchProducts,filterProducts} from "../actions/productActions"
import {connect} from "react-redux"

class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product:null,

        }
    }

    componentDidMount(){
        this.props.fetchProducts();
    }
    openModal=(product)=>{
        this.setState({product:null})
    }
    closeModal=()=>{
        this.setState({product:null})
    }
    render() {
        const { product }=this.state;
        return (
            <div>
                <Fade bottom cascade>
                   

                    { 
                    
                    !this.props.products ? <div>Loading ...</div>:
                                            <ul className="products">

                                            {this.props.products.map(product=>(
                                                <li key={product._id} className="product-box">
                                                    <div className="product">
                                                        <a href={"#"+product._id} className="image-product">
                                                            <img src={product.image} alt={product.title} onClick={()=>this.openModal(product)}>
                                                                
                                                            </img>
                                                            <p>
                                                                    {product.title}
                                                                </p>
                                                            </a>
                                                        <div className="product-price">
                                                            <div>
                                                                {formatCurrency(product.price)}
                                                            </div>
                                                            <button className="button primary" onClick={()=>this.props.addToCart(product)}>
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                    }

                </Fade>
                {
                    product &&(
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom >
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}>

                                    </img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>
                                            {product.title}
                                            </strong>
                                            
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            available sizes:{" "}
                                            {product.availableSizes.map(
                                                x=>(
                                                    <span>
                                                        {" "}<button className="button">{x}</button>
                                                    </span>
                                                )
                                            )}
                                        </p>
                                        <div className="product-price">
                                            <strong>Price:{" "+formatCurrency(product.price)}</strong>
                                        </div>
                                        <button className="button primary" onClick={()=>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>Add to cart
                                                
                                        </button>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                        
                     
                        
                    )
                }
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        products:state.products.filteredItems,
    }
  }
export default connect(
    mapStateToProps,
    {fetchProducts,filterProducts}
)(Products)