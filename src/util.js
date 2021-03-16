export function formatCurrency(num){
    return "$"+Number(num.toFixed(1)).toLocaleString()+" ";
}
export const selectItems=(items,newValue)=>{
    return items.filter(e=>{

        if(e.price>=newValue[0] && e.price<newValue[1]){
            return e
        }
        
    })
}
export const sortItems=(items,sort)=>{

    console.log(items)
    let sortedItems=items;
    if(items.length>0){
        
        if (sort === "latest") {
            sortedItems=items.sort((a, b) => (a._id > b._id ? 1 : -1));
          } else {
            sortedItems.sort((a, b) =>
              sort === "lowest"
                ? a.price > b.price
                  ? 1
                  : -1
                : a.price > b.price
                ? -1
                : 1
            );
          }
    }else{
        sortedItems=[];
    }

      return sortedItems;
}

export const filterItems=(items,size)=>{
        if(size==="ALL"){
            return items;
        }else{
            return items.filter((x)=>x.availableSizes.indexOf(size)>=0)
        }

}