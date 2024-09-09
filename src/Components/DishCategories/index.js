import './index.css'

const DishCategories = props => {
  const {eachItem, onChangeCategory, activeCategory} = props
  const {menuCategory, menuCategoryId} = eachItem

  const onclickCategory = () => {
    onChangeCategory(menuCategoryId)
  }

  const activeCategoryClassName =
    activeCategory === menuCategoryId ? 'active each-category' : 'each-category'

  return (
    <li className="category-list-item" onClick={onclickCategory}>
      <button className={activeCategoryClassName} type="button">
        {menuCategory}
      </button>
    </li>
  )
}

export default DishCategories
