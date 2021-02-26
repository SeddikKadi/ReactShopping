import data from "./data.json"
import react from "react"
import Products from "./components/Products"
import Filter from "./components/Filter"
class App extends react.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
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
  //feature -1 test branche commit
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
            <Products products={this.state.products}/>
          </div>
          <div className="sidebar">
            cart Items
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
