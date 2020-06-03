import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import cx from 'classnames'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { deleteCategory, updateCategory } from '../actions'

export default function Categories({ categories }) {
    const [oldCategoryName, setOldCategoryName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [isCategorySelected, setIsCategorySelected] = useState('');
    const [errorName, setErrorName] = useState('');

    const dispatch = useDispatch()

    const onDeleteCategory = useCallback((e) => {
        dispatch(deleteCategory({ name: e.target.closest('.row').dataset.name }))
    })
    const onUpdateCategory = useCallback((e) => {
        const oldCategoryName = e.target.closest('.row').dataset.name;
        const newCategoryName = categoryName;
        if (oldCategoryName !== newCategoryName) {
            if (_.isEmpty(newCategoryName)) {
                setErrorName('Category name can not be empty')
            } else if (_.some(categories, { name: newCategoryName })) {
                setErrorName('Category name exist')
            } else {
                dispatch(updateCategory({ name: e.target.closest('.row').dataset.name }, { name: newCategoryName }))
            }
        } else {
            setOldCategoryName('')
        }
    })
    const onEdit = useCallback((e) => {
        const name = e.target.closest('.row').dataset.name
        setOldCategoryName(name)
        setCategoryName(name)
    })
    const onCancel = useCallback((e) => {
        setOldCategoryName('')
        setErrorName('')
    })
    const onCategoryNameChanged = useCallback((e) => {
        setCategoryName(e.target.value)
    })
    const onRowSelected = useCallback((e) => {
        setIsCategorySelected(e.target.dataset.name)
    })

    const getActions = useCallback((isEditCategory) => {
        return isEditCategory ?
            (<>
                <Col sm={1.1}>
                    <Button onClick={onUpdateCategory}>Save</Button>
                </Col>
                <Col>
                    <Button onClick={onCancel}>Cancel</Button>
                </Col>
            </>)
            : (<>
                <Col sm={1.1}>
                    <Button onClick={onEdit}>Edit</Button>
                </Col>
                <Col>
                    <Button onClick={onDeleteCategory}>Delete</Button>
                </Col>
            </>)
    })
    return (
        <div className='category-list-container'>
            {categories.length
                ? <Container>
                    <Row className='category-list-header'>
                        <Col sm={7}>Name</Col>
                        <Col>Actions</Col>
                    </Row>
                    {_.map(categories, ({ name }, index) => {
                        const isEditCategory = oldCategoryName === name
                        const isSelectedCategory = isCategorySelected === name
                        const rowClassName = cx('category-list-content', { selected: isSelectedCategory })
                        return (
                            <Row key={index} data-name={name} className={rowClassName} onClick={onRowSelected}>
                                <Col sm={7} title={name}>
                                    {isEditCategory ? <Form.Control onChange={onCategoryNameChanged} value={categoryName} /> : name}
                                </Col>
                                    {errorName && isEditCategory && <div className='error'>{errorName}</div>}
                                {isSelectedCategory || isEditCategory ? getActions(isEditCategory) : null}
                            </Row>
                        )
                    })}
                </Container>
                : 'No Categories'}
        </div>
    );
}
Categories.propTypes = {
    categories: PropTypes.array
}