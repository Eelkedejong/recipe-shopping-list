import { Link } from "react-router-dom"

const Recipe = ( props ) => {
  const { name, description, persons, carb, time, ingredients, id } = props

  return (
    <Link to={`/recipe/${id}`} className="recipe-tile flex">
      <div className="recipe-info">
        <div>
          <h2>{ name }</h2>
          <div>{ description }</div>
        </div>
        <div>
          <div>persons: { persons }</div>
          <div>carb: { carb }</div>
          <div>time: { time }</div>
        </div>
      </div>

      <div className="ingredients">
        <div>ingredients: { ingredients }</div>
      </div>
    </Link>
  )
}

export default Recipe