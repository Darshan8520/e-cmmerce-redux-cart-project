import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Badge from '@mui/material/Badge'
import { NavLink } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import  Table  from 'react-bootstrap/Table'
import {DELETE} from '../Redux/actions/action'
// import MenuItem from '@mui/material/MenuItem';
const Header = () => {
    const [price,setPrice]=useState(0)
    // console.log(price);
    const dispatch = useDispatch()
    const getData = useSelector((state) => state.cartreducer.carts)
    console.log(getData);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const dlt=(id)=>{
        dispatch(DELETE(id))
    }
    const total=()=>{
        let Price=0;
        getData.map((ele,key)=>{
            Price = ele.price * ele.qnty + Price
        })
        setPrice(Price)
    }
    useEffect(()=>{
        total()
    },[total])
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to='/' className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to='/' className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color='primary'
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
                    </Badge>
                </Container>
                <Menu  
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
      {
                        getData.length?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>  Photo </th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e)=>{
                                                return(
                                                    <tr>
                                                        <td>
                                                          <NavLink to={`cart/${e.id}`} onClick={handleClose}><img src={e.imgdata} style={{width:"5rem",height:"5rem"}}/></NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price: ₹ {e.price}</p>
                                                            <p>Quantity: {e.qnty}</p>
                                                            <p style={{color:"red",cursor:"pointer",fontSize:20}}><i className='fas fa-trash smalltrash'></i></p>
                                                        </td>
                                                        <td className='mt-5' style={{color:"red",cursor:"pointer",fontSize:20}} onClick={()=>dlt(e.id)}>
                                                         <i className='fas fa-trash largetrash '></i>   
                                                        </td>
                                                 </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <p className='text-center'>Total : ₹ {price}</p>
                                </Table>
                            </div>
                                :
                                <div className='card_details d-flex justify-content-center align-item-center' style={{ width: "20rem", padding: 8, position: "relative" }}>
                                    <i className='fas fa-close smallclose' style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: 'pointer' }}
                                        onClick={handleClose}></i>
                                    <p style={{ fontSize: 22, marginTop: 17 }}>Your cart is Empty</p>
                                    <img src="https://raw.githubusercontent.com/harsh17112000/react_redux_cart_youtube/2466e2770af0f50814b2fe9c26a45603118a9ad5/public/cart.gif" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                                </div>
                                }
                                </Menu>
            </Navbar>
        </>
    )
}

export default Header
