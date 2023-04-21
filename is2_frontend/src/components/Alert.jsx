
import style from "./style.module.css"; //modificar estilos de alertas custom
import css from "classnames";
import React,{useState} from "react";


export default function Alert({children, type, message}) {
    const[isShow,setIsShow] = useState(true);

    const renderAlert = function(){
        return React.cloneElement(children);
    }

    const handleClose= (e) => {
        e.preventDefault();
        setIsShow(false);
    }
    return (
        <div className={css(style.alert, style[type], !isShow && style.hide)}> 
            <span className={style.closebtn} onClick={handleClose}>
                &times;
            </span>
            {children ? renderAlert() : message}
        </div>
      );
    }

