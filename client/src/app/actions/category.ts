import { CategoryItem } from '../../interfaces/features/CategoryEntity'
import * as types from '../constants/ActionTypes'
// GET A CATEGORY
export const getCategory = (pageInfo: any) => {
  return {
    type: types.ACTION_GET_CATEGORIES,
    payload: {
      pageInfo,
    },
  }
}

export const getCategoriesSuccess = (data: any) => {
  return {
    type: types.GET_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  }
}

export const getCategoriesError = (data: any) => {
  return {
    type: types.GET_CATEGORY_ERROR,
    payload: {
      data,
    },
  }
}

// CREATE A CATEGORY
export const createCategory = (data: { name: string }) => {
  return {
    type: types.ACTION_CREATE_CATEGORY,
    payload: {
      data,
    },
  }
}

export const createCategorySuccess = (data: any) => {
  return {
    type: types.CREATE_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  }
}

export const createCategoryError = () => {
  return {
    type: types.CREATE_CATEGORY_ERROR,
  }
}

// UPDATE A CATEGORY
export const updateCategory = (data: CategoryItem) => {
  return {
    type: types.ACTION_UPDATE_CATEGORY,
    payload: {
      data,
    },
  }
}

export const updateCategorySuccess = (data: any) => {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  }
}

export const updateCategoryError = () => {
  return {
    type: types.UPDATE_CATEGORY_ERROR,
  }
}

// DELETE A CATEGORY

export const deleteCategory = (id: any) => {
  return {
    type: types.ACTION_DELETE_CATEGORY,
    payload: {
      id,
    },
  }
}

export const deleteCategorySuccess = (id: any) => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: {
      id,
    },
  }
}

export const deleteCategoryError = () => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
  }
}

// GET A CATEGORY BY ID
export const getCategoryById = (id: string) => {
  return {
    type: types.ACTION_GET_CATEGORY_BY_ID,
    payload: {
      id,
    },
  }
}

export const getCategoryByIdSuccess = (data: any) => {
  return {
    type: types.GET_CATEGORY_BY_ID_SUCCESS,
    payload: {
      data,
    },
  }
}

export const getCategoryByIdError = (error: any) => {
  return {
    type: types.GET_CATEGORY_BY_ID_ERROR,
    payload: {
      error,
    },
  }
}
