import React from 'react';
import { useState } from 'react';
import './App.css';

export default function App() {
    return (
        <div>
          <label htmlFor="parameter">Parameter: </label>
          <select id="parameter">
            <option value="fructose">Fructose</option>
            <option value="glucose">Glucose</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>
    );
}
