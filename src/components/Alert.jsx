import React from "react";

const Alert = (props) => {
  
  return (
    <div className="h-12">
      <div
        id="alert-1"
        className={`flex items-center p-4  text-${props.alert.type}-800 rounded-lg bg-${props.alert.type}-200 dark:bg-gray-800 dark:text-blue-400`}
        role="alert"
      >
       
        
        <div className="ms-3 text-sm font-semibold">
          {props.alert.msg}
        </div>
        
      </div>
    </div>
  );
};

export default Alert;
