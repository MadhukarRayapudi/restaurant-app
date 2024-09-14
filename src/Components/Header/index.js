import './index.css'

import {FiShoppingCart} from 'react-icons/fi'

const Header = props => {
  const {cartCount, restaurantName} = props

  return (
    <div className="header">
      <h1 className="header-heading"> {restaurantName} </h1>
      <div className="cart-icon-and-quantity-container">
        <p className="my-orders"> My Orders </p>
        <FiShoppingCart className="cart-icon" />
        <p className="cart-quantity"> {cartCount} </p>
      </div>
    </div>
  )
}
export default Header
