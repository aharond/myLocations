import { categoryConstants } from '../constants';

export const addCategory = (category) => {
    return {
        type: categoryConstants.ADD_CATEGORY,
        payload: {category}
    }
}

export const deleteCategory = (category) => {
    return {
        type: categoryConstants.DELETE_CATEGORY,
        payload: {category}
    }
}
export const updateCategory = (oldCategory, newCategory) => {
    return {
        type: categoryConstants.UPDATE_CATEGORY,
        payload: {oldCategory, newCategory}
    }
}
