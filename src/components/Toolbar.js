import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { addCategory } from '../actions'
import { CATEGORY_OPTIONS } from '../enums'

export default function Toolbar({ categories }) {
    const [categoryName, setCategoryName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS.LIST.value);

    const dispatch = useDispatch()
    const onCategoryNameChanged = (e) => {
        setCategoryName(e.target.value)
    }
    
    const onCategoryChanged = (e) => {
        const optionValue = _.toNumber(e.target.value)
        setCategoryOption(optionValue)
    }

    const addNewCategory = () => {
        if (_.isEmpty(categoryName)) {
            setErrorName('Category name can not be empty')
        } else if (_.some(categories, { name: categoryName })) {
            setErrorName('Category name exist')
        } else {
            dispatch(addCategory({ name: categoryName }))
            setCategoryName('');
            setErrorName('')
        }
    }
    return (
        <Container className='toolBar-container'>
            <Row>
                <Col sm={5}>
                    <Form.Group as={Row} controlId='categoryOptions'>
                        <Form.Label column sm={2.5}>Categories</Form.Label>
                        <Col >
                            <Form.Control as="select" onChange={onCategoryChanged}>
                                {_.map(CATEGORY_OPTIONS, ({value, name}) => (<option key={value} value={value}>{name}</option>))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Col>
                {categoryOption === CATEGORY_OPTIONS.NEW.value ? <>
                    <Col sm={5}>
                        <Form.Group as={Row} controlId='categoryName'>
                            <Form.Label column sm={3.5}>Category Name:</Form.Label>
                            <Col>
                                <Form.Control autocomplete='off' onChange={onCategoryNameChanged} value={categoryName} />
                                {errorName && <div className='error'>{errorName}</div>}
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button onClick={addNewCategory}>new category</Button>
                    </Col>
                </> : null}
            </Row>
        </Container>
    );
}
Toolbar.propTypes = {
    categories: PropTypes.array
}