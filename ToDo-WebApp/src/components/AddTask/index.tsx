import { TaskForm } from '../TaskForm';
import * as Component from './styles';
import { useState } from 'react';


export const AddTask = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm);
    }

    return (
        <Component.Container>
            <button onClick={handleClick}>➕</button>
            {showForm && <TaskForm />}
        </Component.Container>
    );
}