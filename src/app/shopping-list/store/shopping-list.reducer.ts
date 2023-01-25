import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[]
  editedIngredient: Ingredient
  editedIngredientIndex: number
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

/**
 * This [...] is called spread operator
 * @param state
 * @param action
 */
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.Actions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return state.editedIngredientIndex !== index
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}, // trick to copy the state, so we do not change
                                                                  // the ingredients object directly
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      }
    default:
      return state
  }
}
