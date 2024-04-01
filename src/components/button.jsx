<style>

</style>

import React from "react";

function Button({ text = "", className = "", onClick = () => {}, icon = null }) {

    return <button onClick={onClick} className={className}>{text}<i className={icon}></i></button>;
}

export default Button;
