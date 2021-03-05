import data from "./data.json"
import react from "react"
import Products from "./components/Products"
import Filter from "./components/Filter"
import Cart from "./components/Cart"
class App extends react.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      cartItems:[],
      size:"ALL",
      sort:"",
    }
  }
  
  sortProducts=(event)=>{
   
    if(event.target.value==="latest"){
      console.log(event.target.value)
      this.setState(
        state=>({
          products:data.products,
          size:this.state.size,
          sort:event.target.value
        }))
    }else if(event.target.value==="lowest"){
      this.setState(
        state=>({
          products:this.state.products.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)),
          size:this.state.size,
          sort:event.target.value
        })
      )
    }else{
      this.setState(
        state=>({
          products:this.state.products.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)),
          size:this.state.size,
          sort:event.target.value
        })
      )
    }
    

  }
  filterProducts=(event)=>{
  
    console.log(event.target.value)

    if(event.target.value=="ALL"){
     

      this.setState({
        size:event.target.value,
        products:data.products
      })
    }else{
      let prods=data.products.filter(product=>product.availableSizes.includes(event.target.value))
      this.setState({
        size:event.target.value,
        products: prods
      })
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

    this.setState((state)=>
      ({cartItems:cartItems }))

  }

  removeCartItem=(item)=>{
    const cartItems=this.state.cartItems.slice();
    var elements = cartItems.filter(element => {
      return item._id != element._id;
    })
    this.setState({cartItems:elements})
  }
  render(){
  
    return (
      <div className="grid-container">
        <header>
          <a href="/">Sopping Cart</a>
        </header>
        <main>
          <div className="content">

          <div className="main">
            <Filter 
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                  
            />
            <Products products={this.state.products}
                      addToCart={this.addToCart}/>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems}
                  removeCartItem={this.removeCartItem}/>
          </div>

          </div>
        </main>
        <footer>
          All rights reserved.
        </footer>
  
      </div>
    );
  }

}

export default App;
