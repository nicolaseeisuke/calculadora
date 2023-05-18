const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operantion');
const  buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
  constructor(previousOperationText, currentOperationText){
       this.previousOperationText = previousOperationText;
       this.currentOperationText = currentOperationText;
       this.currentOperation = ""
  }

  //adicionar dígito na tela da calculadora
  addDigit(digit){
    //verifique se a operação atual já tem ou não
    if(digit ==='.' && this.currentOperationText.innerText.includes(".")){
      return
    }
    this.currentOperation = digit
    this.updateScreen(); 
  }

  //processar todas as operações calculadora
  precessOperation(operation){
  //verifique se a corrente está vazia
  if(this.currentOperationText.innerText === "" && operation !== "C"){
    // operação de mudança
    if(this.previousOperationText.innerText !== "" ){
      this.changeOperation(operation)
    }
    return
  }

 
    //obter valor anterior atual

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText

    switch(operation){
      case "+":
          operationValue = previous + current
          this.updateScreen(operationValue, operation, current, previous)
        break
      case "-":
          operationValue = previous - current
          this.updateScreen(operationValue, operation, current, previous)
        break
      case "*":
          operationValue = previous * current
          this.updateScreen(operationValue, operation, current, previous)
        break
      case "/":
          operationValue = previous / current
          this.updateScreen(operationValue, operation, current, previous)
        break
      case "DEL":
        this.processDelOperator()
        break
      case "CE":
          this.processClearCurrenteOpeartion()
        break
      case "C":
          this.precessClearAllOperation()
          break
      case "=":
          this.precessEqualOperator()
          break
      default:
    }
  }


  // alterar o valor da tela de cálculo
  updateScreen(
    operationValue = null, 
    operation = null, 
    current = null, 
    previous = null) {
    if(operationValue === null){
      this.currentOperationText.innerText += this.currentOperation
    }else{
       //verifique se o valor é zero, se for apenas adicione o valor atual
       if(previous === 0){
        operationValue = current
       }
     //adicionar valor atual anterior
     this.previousOperationText.innerText = `${operationValue} ${operation}`
     this.currentOperationText.innerText= "";
       
    }
}

    // alterar operação matemática
    changeOperation(operation){
      const mathOperation = ["*", "/", "+", "-"]
    
      if(!mathOperation.includes(operation)){
        return
      }      
 
     this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }


    // Excluir o dígito da lista
    processDelOperator(){
      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // limpar a operação atual
    processClearCurrenteOpeartion(){
      this.currentOperationText.innerText = ""
    }

    // limpa tudo 
    precessClearAllOperation(){
      this.currentOperationText.innerText = ""
      this.previousOperationText.innerText = ""
    }

    // resultado
    precessEqualOperator(){
      const operantion = previousOperationText.innerText.split(" ")[1]

      this.precessOperation(operantion)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText

    if(+value >= 0 || value ==="."){
      calc.addDigit(value)
    }else{
      calc.precessOperation(value)
    }
  })
})