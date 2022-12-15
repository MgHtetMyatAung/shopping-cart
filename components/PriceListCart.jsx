import React from 'react';
import {BsFillTrashFill} from 'react-icons/bs';
import { Button } from 'flowbite-react';
import { useStateContext } from '../context/StateContext';
import { useState, useEffect } from 'react';

const PriceListCart = ({item,plusTotal,minusTotal}) => {
    const {dispatch}= useStateContext();
    const [countQty,setCountQty]= useState(0);
    useEffect(() => {
        setCountQty(item.qty);
    }, []);

    const plusQty=()=> {
        setCountQty(pre=> pre+1);
        plusTotal(item.price)
    };
    const minusQty=()=> {
        setCountQty(pre=> pre>1?pre-1:pre);
        if(countQty>1){
            minusTotal(item.price)
        }
    };

    const singleRemoveCart=()=>{
        minusTotal(item.price*countQty);
        dispatch({type:'REMOVE_FROM_CART',payLoad:item});
    }
  return (
                <div className="flex gap-5 mb-5 items-center shadow-lg">
                    <div className='w-[150px] lg:w-[180px]'>
                        <img src={item.image} alt="" className='h-[100px] lg:h-[100px] mx-auto'/>
                    </div>
                    <div className='py-3'>
                        <h3 className='text-xl'>{item.title.substring(0,30)}</h3>
                        <div className='flex items-center gap-4 my-3'>
                            <p className='mb-2 text-lg w-20'>{(item.price * countQty).toFixed(2)} $</p>
                            <Button.Group>
                                <Button color="gray" onClick={minusQty}>
                                    -
                                </Button>
                                <Button color="gray" className='w-16'>
                                    {countQty}
                                </Button>
                                <Button color="gray" onClick={plusQty}>
                                    +
                                </Button>
                            </Button.Group>
                        </div>
                        <BsFillTrashFill size={20} className='text-danger' onClick={singleRemoveCart}/>
                    </div>
                </div>
  )
}

export default PriceListCart;