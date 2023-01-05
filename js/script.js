
const Main = {

  init: function() {
    this.cacheSelectors()
    this.bindEvents()
  },

  cacheSelectors: function() {
    this.form = document.querySelector('#form')
  },

  bindEvents: function() {
    
    this.form.onsubmit = this.Events.compoundInterest
  },

  Events: {
    compoundInterest: function(e) {
      e.preventDefault()
      
      let monthlyFee = document.forms['form'].monthlyFee.value
      let interest_rate = document.forms['form'].interestrate.value
      let yearsTime = document.forms['form'].yearsTime.value

      interest_rate = parseFloat(interest_rate.replace(',' , '.'))/100
      yearsTime = yearsTime * 12 
    
      fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: `{"expr": "${parseFloat(monthlyFee)} * (((1 + ${interest_rate}) ^ ${yearsTime} - 1) / ${interest_rate})"}`
      })
      .then(res => res.json().then(data => Main.Events.responsePage(data)))
      .catch( ()=> {console.log('erro')})
    },
  
    responsePage: function(data) {
      console.log(data)
    }
  }
}

Main.init()
