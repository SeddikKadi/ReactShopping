
import react from "react"
import Products from "./components/Products"
import Filter from "./components/Filter"
import Cart from "./components/Cart"
import Store from "./store"
import {Provider} from "react-redux"

class App extends react.Component {
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
              <Cart/>
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
