const timer = Number(localStorage.getItem('timer')) || 500;


const showAlert =  function() {

    this.showMessegeAlert = (alert, message, error = false, time = 3000 ) => {
        alert
            .classList.add(`alert-${ error ? 'danger' : 'success' }`)
            .classList.remove(`alert-${ error ? 'success' : 'danger' }`)
            .textContent = message
            .style.display = 'block'
        setTimeout(() => alert.style.display = 'none', time);
    }

    this.showError = ( divInput = '', divError, messageError = '', show = true, timer = false ) => {
      if(divInput) divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)'
      divError.innerText = messageError;
      if(timer){
        const time = 2000;
        divError.style.display = 'block';
        if(divInput) setTimeout(() => divInput.style.borderColor = 'hsl(270, 3%, 87%)', time);
        setTimeout(() => divError.style.display = 'none', time);
      }
    }

     this.verifyIsFilled = ( input, divError ) => {
      divError.style.display = input.value == '' ?  'block' : 'none';
      return input.value == '' ? false : true;
    }
     this. validateLettersOrNumber = ( input, typeInput = 'text' | 'number' ) => {
      const regex = typeInput == 'text' ? /[A-z]/g : /^[0-9]*$/;
      return regex.test(input.value) ? true : false;
    }

    this.validateAllfields = ( divInput, divError, fieldNumber = false ) => {
    
        const isFilled = verifyIsFilled(divInput, divError);
      
        if (isFilled) {
            const typeField = fieldNumber ? 'number' : 'text';
            const isField = validateLettersOrNumber(divInput, typeField);
            showError(divInput, divError, isField ? '': `Solo se permiten ${typeField == 'number' ? 'numeros' : 'letras'}`, isField ? false : true );
            return isField;
        
        } 
      
        showError(divInput, divError, 'Este campo es obligatorio', true);
        return false;
    
    }
}

const M = new showAlert();