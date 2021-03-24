import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultPanel = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get("/api/Result").then(res => {
            setResult(res.data);
        })
    }, [])

    return (
        <div className="result-panel">
            <div>Sample API Result:</div>
            {result ? <div>{JSON.stringify(result)}</div> : null}
        </div>
    )
};

export default ResultPanel;