
const Main = {

  init: function() {
    this.cacheSelectors()
    this.bindEvents()
  },

  cacheSelectors: function() {
    this.form = document.querySelector('#form')
    this.resetButton = document.querySelector('.resetbutton')
  },

  bindEvents: function() {
    this.form.onsubmit = this.Events.compoundInterest
    this.resetButton.onclick = this.Events.resetpage
  },

  Events: {
    compoundInterest: function(e) {
      e.preventDefault()
      
      const firstScreen = document.querySelector('.firstscreen')
      const secondScreen = document.querySelector('.secondscreen')
      const resultmsg = document.querySelector('.msg')
      const name = document.forms['form'].name.value

      let monthlyFee = document.forms['form'].monthlyFee.value
      let interest_rate = document.forms['form'].interestrate.value
      let yearsTime = document.forms['form'].yearsTime.value

      let RemonthlyFee = parseFloat(monthlyFee.replace('R$','').replace(' ', ''))
      let Reinterest_rate = parseFloat(interest_rate.replace(',' , '.'))/100

      const valid = Main.Events.formValidation()
      if (valid == false){
        alert("Algo deu errado, cheque as informações.")
        return
      }

      async function teste() {
        let res = await fetch('https://api.mathjs.org/v4/', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: `{"expr": "${RemonthlyFee} * (((1 + ${Reinterest_rate}) ^ ${yearsTime * 12} - 1) / ${Reinterest_rate})"}`
        })
        return res.json()
      }

      teste().then(data => {
        const result = parseFloat(data.result).toFixed(2)

        resultmsg.innerHTML = `
        <h2>Cálculo de juros compostos</h2>
        <p>Olá ${name}, juntando R$${monthlyFee} todo mês, você terá R$${result} em ${yearsTime} anos.</p>
        `
      }
      ).then( () => {
        firstScreen.classList.add('hidden')
        secondScreen.classList.remove('hidden')
      })
      .catch( ()=> {alert('Ocorreu um erro, tente novamente')})      
    },

    formValidation: function() {

      const name = document.forms['form'].name.value
      const monthlyFee = document.forms['form'].monthlyFee.value
      const interest_rate = document.forms['form'].interestrate.value
      const yearsTime = document.forms['form'].yearsTime.value

      if (name == "" || name == null) {
        return false
      }
      if( monthlyFee == '' || monthlyFee == null) {
        return false
      }
      if( interest_rate == '' || interest_rate == null) {
        return false
      }
      if( yearsTime == '' || yearsTime == null) {
        return false
      }
      return true
    },

    resetpage: function() {
      const firstScreen = document.querySelector('.firstscreen')
      const secondScreen = document.querySelector('.secondscreen')
      const resetButton = document.querySelector('.resetbutton')
      const form = document.forms['form']

      
      firstScreen.classList.remove('hidden')
      secondScreen.classList.add('hidden')
      resetButton.classList.add('hidden')
      form.reset()
    }
  }
}

Main.init()
