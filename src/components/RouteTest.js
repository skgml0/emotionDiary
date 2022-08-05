import React from 'react';
import { Link } from 'react-router-dom';
const RouteTest = () => {
    return (
        <div>
<Link to={"/"}>HOME</Link>
<br />
<Link to={"/diary"}>diary</Link>
<br />
<Link to={"/edit"}>edit</Link>
<br />
<Link to={"/new"}>new</Link>
    </div>
    );
};

export default RouteTest;