import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PriceListCart from '../components/PriceListCart';

const CartPage = () => {
    const {state:{cart},dispatch}= useStateContext();
    const [total,setTotal]= useState(0);
    const navigate= useNavigate();

    useEffect(()=>{
        setTotal(cart.reduce((pv,cv)=>pv+cv.price,0));
    },[]);

    const checkoutHandle=()=>{
        dispatch({type:'REMOVE_ALL_CART'});
        navigate('/success');
    }
    
    const removeAllHandle=()=>{
        dispatch({type:'REMOVE_ALL_CART'});
        setTotal(0);
    }

    const plusTotal=(price)=>{
        setTotal(total+price);
    }

    const minusTotal=(price)=>{
        setTotal(total- price);
    }

  return (
    <>
            {
                cart.length>0? 
                <div className='grid grid-cols-4 px-5 gap-2'>
                    <div className='my-5 flex flex-col gap-5 col-span-4 lg:col-span-3'>
                        {
                            cart.map(item=>
                                <PriceListCart key={item.id} item={item} plusTotal={plusTotal} minusTotal={minusTotal}/>
                            )
                        }
                    </div>
                    <div className='col-span-4 lg:col-span-1 text-center'>
                        <div className='flex flex-col shadow-lg w-full p-5 gap-3 mb-3'>
                            <h1 className='text-xl font-bold'>Total : $ {total.toFixed(2)}</h1>
                            <button onClick={checkoutHandle} className='w-40 py-2 px-3 bg-info text-white rounded mx-auto'>Checkout</button>
                        </div>
                        <button className='py-2 px-4 bg-danger text-white rounded-lg' onClick={removeAllHandle}>Remove All</button>
                    </div>
                </div> :
                <div className='flex flex-col items-center gap-5 pt-[150px]'>
                    <h1 className='text-center text-2xl text-danger'>Your cart is empty </h1>
                    <button className='bg-info py-2 px-4 text-white rounded-lg w-40' onClick={()=>navigate('/')}>Go Shopping</button>
                </div>
            }
    </>
  )
}

export default CartPage;