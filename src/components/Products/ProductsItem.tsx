import type { FC } from "react"
import './Products.scss'
import type { IProduct } from "../../types"
import { Link } from "react-router-dom"

interface IProductsItem{
    product: IProduct
}

const ProductsItem:FC<IProductsItem> = ({ product }) => {
  return (
    <>
        <Link to={`/product/${product.id}`} className="products__item">
            <img src={product.thumbnail} alt="" className="products__item-img" />
            <h2 className="products__item-title">{product.title}</h2>
            <p className="products__item-description">{product.description}</p>
            <span className="product__item-price">Price: ${product.price}</span>
            <span className="product__item-discounted-price">After discount: ${Math.round((product.price - (product.price * product.discountPercentage)/100)*100)/100}</span>
            <span className="product__item-stock">Stock: {product.stock}</span>
        </Link>
    </>
  )
}

export default ProductsItem