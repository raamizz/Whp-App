import React, { useEffect } from "react";

interface Props{
  key:any,
  amount:any,
}
const AffordabilityWidget :React.FC<Props> = ({key,amount}) => {

    const loadWidget=()=> {
      const widgetConfig = { key, amount };
      payuAffordability.init(widgetConfig);
    }
  
    const appendScript=()=> {
      let myScript = document.getElementById("payu-affordability-widget");
      if(!myScript){    
          myScript = document.createElement('script');
          myScript.setAttribute('src', "https://jssdk.payu.in/widget/affordability-widget.min.js");
          myScript.id="payu-affordability-widget";
          document.body.appendChild(myScript);
      }
      myScript.addEventListener('load', loadWidget, true);
    }
  
    useEffect(() => {
        appendScript();
    }, [])

    return (
      <div id="payuWidget"/>  
    )
}

export default AffordabilityWidget;