import data from "./data.json"
import react from "react"
import Products from "./components/products"
class App extends react.Component {
  constructor(){
    super();
    this.state={
      prosucts:data.products,
      size:"",
      sort:""
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
            <Products products={this.state.prosucts}/>
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
