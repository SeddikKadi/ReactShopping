import {FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE, SELECT_RANGE_PRICE}from "../types"
import { selectItems,sortItems,filterItems } from "../util";

export const fetchProducts=()=>async(dispatch)=>{
    const res=await fetch("/api/products");
    const data=await res.json()

    dispatch({
        type:FETCH_PRODUCTS,
        payload:data
    })
};
export const filterProducts=(size)=>(dispatch,getState)=>{

    const items=getState().products.items.slice();
  
   const selectedElements=selectItems(items,getState().products.minMax);

   const filteredElements=filterItems(selectedElements,size)
   
   const sortedElements=sortItems(filteredElements,getState().products.sort);

    dispatch({
        type:FILTER_PRODUCTS_BY_SIZE,
        payload:{
            size:size,
            items:sortedElements,
        }
    })
}

export const sortProducts=(sort)=>(dispatch,getState)=>{
    const filteredProducts=getState().products.filteredItems.slice();
    
      const sortedItems=sortItems(filteredProducts,sort)
    dispatch({
        type:ORDER_PRODUCTS_BY_PRICE,
        payload:{
            sort:sort,
            items:sortedItems
        }
    })
}


export const selectProducts=(e,newValue)=>(dispatch,getState)=>{



    
    const items = getState().products.items.slice();

    const filteredElements=selectItems(items,newValue);

    console.log(getState().products)
    
    const selectElements=filterItems(filteredElements,getState().products.size)
    
    const sortedElements=sortItems(selectElements,getState().products.sort);

    
    dispatch({
        type:SELECT_RANGE_PRICE,
        payload:{
            minMax:newValue,
            items:sortedElements
        }
        
    })
}