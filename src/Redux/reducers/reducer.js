const initialState={
    carts:[]
}

export const cartreducer=(state=initialState,action)=>{
    switch (action.type) {
     case "ADD_CART":
        const itemIndex = state.carts.findIndex((item)=>item.id===action.payload.id)
        if(itemIndex>=0){
            state.carts[itemIndex].qnty +=1
        }
        else{
            const temp = {...action.payload,qnty:1}
                   return{
              ...state,
              carts:[...state.carts,temp]
        }
        }
        case "DELETE_CART":
        const data = state.carts.filter((el)=>el.id !== action.payload)
        return{
            ...state,
            carts : data
        }
         case "REMOVE_CART":
            const itemIndex_dec = state.carts.findIndex((item)=>item.id===action.payload.id)
           if(state.carts[itemIndex_dec].qnty>=1){
            const dltitem =state.carts[itemIndex_dec].qnty -=1
            return{
                ...state,
                carts:[...state.carts]
            }
           }
           else if(state.carts[itemIndex_dec].qnty===1){
           const data =state.carts.filter((el)=>el.id !== action.payload)
           return{
            ...state,
            carts:data
           }
           }
        default:
            return state
    }
}