
import react from "react"
import Products from "./components/Products"
import Filter from "./components/Filter"
import Cart from "./components/Cart"
import Store from "./store"
import {Provider} from "react-redux"
class App extends react.Component {
  constructor(){
    super();
    this.state={
      cartItems:JSON.parse( localStorage.getItem("cartItems"))?JSON.parse( localStorage.getItem("cartItems")):[],
    }
  }
  addToCart=(product)=>{

    const cartItems=this.state.cartItems.slice();
    let found=false;
    cartItems.forEach((element)=>{
      if(element._id===product._id){
        found=true;
        if(typeof(element.count)==='undefined'){
          element.count=1;
        }else{
          element.count++;
        }
      }      
    });


    if(!found){
      cartItems.push({... product,count:1})
    }
    console.log(cartItems)

    this.setState((state)=>
      ({cartItems}))

      console.log(this.state.cartItems)
      localStorage.setItem("cartItems",JSON.stringify(cartItems));

  }

  removeCartItem=(item)=>{
    const cartItems=this.state.cartItems.slice();
    var elements = cartItems.filter(element => {
      return item._id != element._id;
    })
    this.setState({cartItems:elements})
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(element => {
      return item._id != element._id;
    })));
  }
  createOrder=(order)=>{
    alert("Order details: name: "+order.name+" adress: "+order.adress)
  }
  render(){

  
    return (
      <Provider store={Store}>
          <div className="grid-container">
          <header>
            <a href="/">Sopping Cart</a>
          </header>
          <main>
            <div className="content">

            <div className="main">
              <Filter />
              <Products addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems}
                    removeCartItem={this.removeCartItem}
                    createOrder={this.createOrder}/>
            </div>

            </div>
          </main>
          <footer>
            All rights reserved.
          </footer>
    
        </div>
      </Provider>
      
    );
  }

}

export default App;
