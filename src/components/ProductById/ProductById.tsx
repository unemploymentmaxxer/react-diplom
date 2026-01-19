import type { FC } from "react"
import './ProductById.scss'
import { Link, useParams } from "react-router-dom"
import { getProductById } from "../../api/common"
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const ProductById: FC = () => {

    const params = useParams()
    const { data } = getProductById(+params.id!)

    return (
        <>
            {data ?
                <div className="product">
                    <div className="product__top">
                        <Link to="/" className="products__top-link">Back to products</Link>
                    </div>
                    <div className="product__bottom">
                        <div className="product__bottom-left">
                            <Swiper pagination={true} modules={[Pagination]} className="product__bottom-left-swiper">
                                {data.images.map((img: string) => ( <SwiperSlide key={img}> <img src={img} alt="" className="product__bottom-left-swiper-slide"/></SwiperSlide> ))}
                            </Swiper>
                        </div>
                        <div className="product__bottom-right">
                            <h2 className="products__bottom-right-title">{data.title}</h2>
                            <p className="products__bottom-right-description">{data.description}</p>
                            <span className="product__bottom-right-price">Price: ${data.price}</span>
                            <span className="product__bottom-right-discounted-price">After discount: ${Math.round((data.price - (data.price * data.discountPercentage) / 100) * 100) / 100}</span>
                            <span className="product__bottom-right-stock">Stock: {data.stock}</span>
                        </div>
                    </div>
                </div> : ''}
        </>
    )
}

export default ProductById