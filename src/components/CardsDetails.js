import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {DELETE} from '../Redux/actions/action'
import {ADD} from '../Redux/actions/action'
import { REMOVE } from '../Redux/actions/action'
const CardsDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [item,setitem]=useState([])
  const {id} = useParams()
  const getData =useSelector((state)=>state.cartreducer.carts)
  const compare=()=>{
    let comparedata = getData.filter((e)=>{
      return e.id == id
    })
    setitem(comparedata);
  }
  useEffect(()=>{
  compare()
  },[id])
  const send =(e)=>{
    dispatch(ADD(e))
  }
  const dlt =(id)=>{
    dispatch(DELETE(id))
    navigate('/')
  }
  const rmv =(e)=>{
    dispatch(REMOVE(e))
  }
  return (
    <div className='container mt-2'>
      <h2 className='text-center'>Items Details Page</h2>
      <section className='container mt-3'>
        <div className='iteamsdetails'>
          {
            item.map((element)=>{
              return(
                <>
                <div className='items_img'>
                <img src={element.imgdata} className=''/>
                </div>
                <div className='details'>
                 <Table>
                   <tr>
                       <td>
                           <p><strong>Restaurant : </strong>{element.rname}</p>
                           <p><strong>Price : </strong>₹ {element.price}</p>
                           <p><strong>Dishes : </strong>{element.address}</p>
                           <p><strong>Total : </strong>₹ {element.price * element.qnty}</p> 
                           <div className='mt-5 d-flex justify-content-between align-items-center'style={{width:100,cursor:"pointer",color:"#111",background:"#dddd"}}>
                               <span style={{fontSize:24}} onClick={element.qnty<=1 ? ()=>dlt(element.id) : ()=>rmv(element)}>-</span>
                               <span style={{fontSize:22}}>{element.qnty}</span>
                               <span style={{fontSize:24}}onClick={()=>send(element)}>+</span>
                           </div>
                       </td>
                       <td>
                           <p><strong>Rating : </strong><span style={{background:"green",color:"white",padding:"2px 5px",borderRadius:5}}>{element.rating} ★ </span></p>
                           <p><strong>Order Review : </strong>{element.somedata}</p>
                           <p><strong>Remove : </strong><i className='fas fa-trash'style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(element.id)}></i></p>
                       </td>
                   </tr>
                 </Table>
                </div>
                </>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}

export default CardsDetails
