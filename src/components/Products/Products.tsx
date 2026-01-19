import { useEffect, type FC } from "react"
import './Products.scss'
import Sort from "../Sort/Sort"
import ProductsItem from "./ProductsItem"
import { getProducts } from "../../api/common"
import type { IProduct } from "../../types"
import { productStore } from "../../store/productStore"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Pagination from "../Pagination/Pagination"

const Products: FC = () => {

  const { sortValue, setSortValue, limit, skip, currentPage, setSkip, setCurrentPage } = productStore()
  const { data } = getProducts({ sortValue, limit, skip })

  const location = useLocation()
  const navigate = useNavigate()

  const onChangePage = (num: number) => {
    setCurrentPage(num)
    setSkip(num * limit - limit)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSortValue(params.get('sortBy')!)
    setCurrentPage(+params.get('page')!)
  }, [location.search])

  useEffect(() => {
    setSkip(currentPage * limit - limit)
    const params = new URLSearchParams(location.search)
    sortValue ? params.set('sortBy', sortValue) : params.delete('sortBy')
    currentPage && params.set('page', currentPage.toString())
    navigate(`?${decodeURIComponent(params.toString())}`)
  }, [sortValue, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [sortValue])


  return (
    <>
      <div className="products">
        <Link to="/" className="products__title">LOGO</Link>
        <div className="products__sort"><Sort /></div>
        <div className="products__list">
          {data ? data.products.map((product: IProduct) => (
            <ProductsItem
              key={product.id}
              product={product}
            />
          )) : <h2>Loading...</h2>}
        </div>
        {data && <Pagination limit={limit} currentPage={currentPage} totalCount={data.total} onChangePage={onChangePage} />}
      </div>
    </>
  )
}

export default Products