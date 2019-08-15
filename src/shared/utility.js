export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (val, rules) => {
    let isValid = false;

    let requiredRule = (() =>{
        if(rules.required){
            return  val.trim() !=='';
        } else {
            return true;
        }
    })();

    let minLengthRule = (() =>{
        if(rules.minLength){
            return val.length >= rules.minLength;
        } else {
            return true;
        }
    })();

    let maxLengthRule = (() =>{
        if(rules.maxLength){
            return val.length <= rules.maxLength;
        } else {
            return true;
        }
    })();

    let emailRule = (() =>{
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return pattern.test(val);
        } else {
            return true;
        }
    })();

    let numericRule = (() =>{
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            return pattern.test(val);
        } else {
            return true;
        }
    })();

    isValid = requiredRule && minLengthRule && maxLengthRule && emailRule && numericRule;
    return isValid;
};