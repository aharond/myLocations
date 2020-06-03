import _ from 'lodash'
import { categoryConstants } from '../constants';
import { localStorageProvider } from '../providers';
import { STORAGE } from '../enums';

const INITIAL_STATE = {
    categories: localStorageProvider.get(STORAGE.CATEGORY)
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case categoryConstants.ADD_CATEGORY:
            const addedCategories = localStorageProvider.getUpdatedStorage(STORAGE.CATEGORY, (categories) => {
                const existingCategories = categories || []
                return existingCategories.concat(payload.category)
            });
            return {
                ...state,
                categories: addedCategories
            }
        case categoryConstants.DELETE_CATEGORY:
            const newCategories = localStorageProvider.getUpdatedStorage(STORAGE.CATEGORY, (categories) => {
                _.remove(categories, { name: payload.category.name });
                return categories;
            });
            return {
                ...state,
                categories: newCategories
            }
        case categoryConstants.UPDATE_CATEGORY:
            const updatedCategories = localStorageProvider.getUpdatedStorage(STORAGE.CATEGORY, (categories) => {
                return _.map(categories, item => item.name === payload.oldCategory.name ? payload.newCategory : item)
            });
            return {
                ...state,
                categories: updatedCategories
            }
        default:
            return state;
    }
};
