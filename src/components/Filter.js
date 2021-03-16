import React, { Component } from 'react'
import {connect} from "react-redux"
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


import {sortProducts,filterProducts,selectProducts} from "../actions/productActions"

class Filter extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const marks = [
            {
              value: this.props.minMax[0],
              label: this.props.minMax[0]+'$',
            },
            {
                value: this.props.minMax[1],
              label: this.props.minMax[1]+'$',
            },
          ];
          function valuetext(value) {
            return `${value}°C`;
          }
        return !this.props.filteredProducts ?(<div>Loading...</div>):(
                <div className="filter">
                    <div className="filter-result">
                    {this.props.filteredProducts.length} Products
                    </div> 
                    <div className="filter-price">

                    <Typography id="track-inverted-range-slider" gutterBottom>
                        Select price range:
                    </Typography>
                    <Slider
                        track="inverted"
                        aria-labelledby="discrete-slider-restrict"
                        defaultValue={[this.props.minMax[0],this.props.minMax[1]]}
                        marks={marks}
                        onChange={this.props.selectProducts}
                       /* onChange={this.handmeChange} */
                    />
                    
                    </div>
                    <div className="filter-sort" >
                       
                        Order{" "} <select value={this.props.sort} onChange={(e)=>this.props.sortProducts(e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>

                            
                        </select>
                    </div>
                    <div className="filter-size">
                        Filter{" "} 
                        <select value={this.props.size} onChange={(e)=>this.props.filterProducts(e.target.value)}>
                        <option value="ALL">ALL</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        </select>
                    </div>
                
            </div>
            )
    }
}
export default connect(
    (state) => ({
      size: state.products.size,
      sort: state.products.sort,
      products: state.products.items,
      filteredProducts: state.products.filteredItems,
      minMax:state.products.minMax,
    }),
    {
      filterProducts,
      sortProducts,
      selectProducts,
    }
  )(Filter);
