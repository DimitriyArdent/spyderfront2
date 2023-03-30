import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function SimpleForm() {
    const [formState, setFormState] = useState({
        targetWord: '',
        URL: '',
        email: '',
        maxPagesNumber: '',
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    function initialBatch(e) {
        e.preventDefault()

        axios.get('http://localhost:8001/activateSearch', {
            params: {
                targetWord: formState.targetWord,
                URL: formState.URL,
                maxDepth: formState.maxDepth,
                maxPagesNumber: formState.maxPagesNumber
            }
        }).then((res) => {
            console.log(res)
        })

    }

    return (
        <form className='form' onSubmit={initialBatch}>
            <label>
                targetWord:
                <input
                    type="text"
                    name="targetWord"
                    value={formState.targetWord}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                URL:
                <input
                    type="text"
                    name="URL"
                    value={formState.URL}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                maxDepth:
                <input
                    type="text"
                    name="maxDepth"
                    value={formState.maxDepth}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                maxPagesNumber:
                <input
                    type="text"
                    name="maxPagesNumber"
                    value={formState.maxPagesNumber}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default SimpleForm;