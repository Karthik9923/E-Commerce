import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Point from '../assets/Point.png'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts =  ({category}) => {

    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=> {
        if(products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item)=> category === item.category);

            setRelated(productsCopy.slice(0,5))
        }
    },[products])
    
  return (
    <div className='my-24'>
        <div className='py-8 text-2xl flex text-center'>
            <img src={Point} alt="" />
            <Title text1={'RELATED'} text2={'COMPONENTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=> (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} rating={item.rating} reviews={item.reviews} stock={item.stock}/>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts