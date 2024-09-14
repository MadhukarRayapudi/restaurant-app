import {Component} from 'react'

import Header from '../Header'

import DishCategories from '../DishCategories'

import './index.css'

class HomePage extends Component {
  state = {
    activeCategory: '11',
    displayItems: [],
    tableMenuList: [],
    cartCount: 0,
    restaurantName: '',
  }

  componentDidMount() {
    this.getDishes()
  }

  getDishes = async () => {
    const {activeCategory} = this.state
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    // console.log(data[0].table_menu_list[0].category_dishes)

    const updatedMenuList = data[0].table_menu_list.map(eachItem => ({
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
    }))

    const activeCatDishes = data[0].table_menu_list
      .filter(eachItem => eachItem.menu_category_id === activeCategory)
      .flatMap(eachItem =>
        eachItem.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishType: eachDish.dish_Type,
          dishCalories: eachDish.dish_calories,
          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishImage: eachDish.dish_image,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          addonCat: eachDish.addonCat,
          dishAvailability: eachDish.dish_Availability,
          dishCount: 0,
        })),
      )

    // console.log(activeCatDishes)
    await this.setState({
      tableMenuList: updatedMenuList,
      displayItems: activeCatDishes,
      restaurantName: data[0].restaurant_name,
    })
  }

  onChangeCategory = async category => {
    await this.setState({activeCategory: category})
    this.getDishes()
  }

  onReduceQuantity = dishId => {
    // const {cartCount} = this.state
    this.setState(prevState => ({
      displayItems: prevState.displayItems.map(item =>
        item.dishId === dishId && item.dishCount > 0
          ? {...item, dishCount: item.dishCount - 1}
          : item,
      ),
      cartCount: prevState.cartCount - 1,
    }))

    // if (cartCount > 0) {
    //   this.setState(prevState => ({
    //     cartCount: prevState.cartCount - 1,
    //   }))
    // }
  }

  onIncreaseQuantity = dishId => {
    this.setState(prevState => ({
      displayItems: prevState.displayItems.map(item =>
        item.dishId === dishId
          ? {...item, dishCount: item.dishCount + 1}
          : item,
      ),
      cartCount: prevState.cartCount + 1,
    }))
  }

  render() {
    const {
      tableMenuList,
      activeCategory,
      displayItems,
      cartCount,
      restaurantName,
    } = this.state
    return (
      <>
        <Header cartCount={cartCount} restaurantName={restaurantName} />
        <div className="main-page-excluding-header">
          <div className="categories-list">
            {tableMenuList.map(eachItem => (
              <DishCategories
                eachItem={eachItem}
                key={eachItem.menuCategoryId}
                onChangeCategory={this.onChangeCategory}
                activeCategory={activeCategory}
              />
            ))}
          </div>
          <ul className="dishes-list-container">
            {displayItems.map(eachItem => (
              <li className="dish-card" key={eachItem.dishId}>
                <div className="dish-card-2">
                  <img
                    alt={eachItem.dishType}
                    src={
                      eachItem.dishType === 1
                        ? 'https://res.cloudinary.com/dqv0mp6k8/image/upload/v1725866653/Screenshot_2024-09-09_125253_hlaejd.png'
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8zZWHaSki2S4Xl8nYF--Ys6LsqXBK7h9TVpIp-Uh6qkLW2e1fcvU-nkF4KsfwzLGstE&usqp=CAU'
                    }
                    className="veg-non-veg-symbol"
                  />

                  <div className="dish-details">
                    <h1 className="dish-name"> {eachItem.dishName} </h1>
                    <p className="dish-price">
                      {eachItem.dishCurrency} {eachItem.dishPrice}
                    </p>
                    <p className="dish-description">
                      {eachItem.dishDescription}
                    </p>

                    {eachItem.dishAvailability ? (
                      <p className="button">
                        {eachItem.dishCount > 0 ? (
                          <button
                            type="button"
                            className="minus-plus-btn"
                            onClick={() =>
                              this.onReduceQuantity(eachItem.dishId)
                            }
                          >
                            -
                          </button>
                        ) : (
                          <button type="button" className="minus-plus-btn">
                            -
                          </button>
                        )}
                        {eachItem.dishCount}
                        <button
                          type="button"
                          className="minus-plus-btn"
                          onClick={() =>
                            this.onIncreaseQuantity(eachItem.dishId)
                          }
                        >
                          +
                        </button>
                      </p>
                    ) : (
                      <p className="not-available"> Not available </p>
                    )}
                    {eachItem.addonCat.length > 0 && (
                      <p className="customizations-text">
                        Customizations available
                      </p>
                    )}
                  </div>
                </div>
                <p className="calories"> {eachItem.dishCalories} Calories </p>
                <img
                  src={eachItem.dishImage}
                  className="dish-img"
                  alt={eachItem.dishName}
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default HomePage
