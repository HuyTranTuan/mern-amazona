import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function SearchComponent() {
    const navigate = useNavigate()
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    }
    return (
        <Form className='d-flex me-auto' onSubmit={handleSubmit}>
            <InputGroup>
                <FormControl
                    type='text' 
                    name='q'
                    id='q'
                    onChange={(e)=> setQuery(e.target.value)}
                    placeholder="Search products..."
                    aria-label='Search Products'
                    aria-describedby='button-search'
                >
                </FormControl>
                <Button variant='outline-primary' type='submit' id='button-search'>
                    <i className='fas fa-search'></i>
                </Button>
            </InputGroup>
        </Form>
    )
}
