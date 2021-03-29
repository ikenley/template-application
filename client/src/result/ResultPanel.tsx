import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultPanel = () => {
    const [result, setResult] = useState(null);
    const [todoItems, setTodoItems] = useState(null);

    useEffect(() => {
        axios.get("/api/Result").then(res => {
            setResult(res.data);
        });

        axios.get("/api/TodoItems").then(res => {
            setTodoItems(res.data);
        })
    }, [])

    return (
        <div className="result-panel">
            <div>Sample API Result:</div>
            {result ? <div>{JSON.stringify(result)}</div> : null}
            {todoItems ? <div>{JSON.stringify(todoItems)}</div> : null}
        </div>
    )
};

export default ResultPanel;