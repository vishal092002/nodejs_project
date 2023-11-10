'use client'
import React, { useState } from "react";
import processForm from "@/app/action";

export default function Form() {
    const [selectedSchema, setSelectedSchema] = useState('User');

    let create = processForm.bind(null);

    //Returning the form. 
    //This form uses useState from React to dynamically update the data a user can imput in the form depending on the selected schema.
    return (
        <form action={create}>
            <div className="method">
                <label htmlFor="method">Method (Select from menu): </label>
                <select name="method" id="method">
                    <option value="POST">Create</option>
                    <option value="GET">Read</option>
                    <option value="PATCH">Update</option>
                    <option value="DELETE">Delete</option>
                </select>
            </div>
            <div className="schema">
                <label htmlFor="schema">Schema: User </label>
                <input type="radio" name="schema" id="user" value="User" defaultChecked="true"
                    onChange={() => setSelectedSchema('User')} />
                <label htmlFor="schema">Pet </label>
                <input type="radio" name="schema" id="pet" value="Pet" onChange={() => setSelectedSchema('Pet')} />
            </div>
            <div className="id">
                <label htmlFor="id">ID (Leave empty for a new user): </label>
                <input type="text" name="id" id="id" required />
            </div>
            {selectedSchema === 'User' && (
            <>
            <div className="name">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" required />
                </div>
                <div className="email">
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" required />
            </div>
            </>
            )}
            {selectedSchema === 'Pet' && (
            <div className="pet">
                <label htmlFor="petType">Type of Pet: </label>
                <input type="text" name="petType" id="petType" required />
                <label htmlFor="petName">Pet Name: </label>
                <input type="text" name="petName" id="petName" required />
            </div>
            )}
            <div class="submit">
               <input type="submit" />
            </div>
        </form>
    );
}
