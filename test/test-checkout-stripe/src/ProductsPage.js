import "./ProductsPage.css"

const ProductsPage = (props) => {



    return (
        <div className="ProductsPage">
            <div className="product" onClick={props.selectedProduct}>
                Product A : $10.00
            </div>
            <div className="product" onClick={props.selectedProduct}>
                Product B : $20.00
            </div>
            <div className="product" onClick={props.selectedProduct}>
                Product C : $15.99
            </div>
        </div>)
}

export default ProductsPage;