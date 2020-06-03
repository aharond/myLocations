import React from 'react';
import { useSelector } from 'react-redux'
import { Categories, Toolbar } from './index'

export default function AppLayout() {
    const categories = useSelector(({ categoryReducer }) => categoryReducer.categories)
    return (
        <>
            <Toolbar categories={categories} />
            <Categories categories={categories} />
        </>
    );
}