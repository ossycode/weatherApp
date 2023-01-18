import * as domElem from './domCollection'



domElem.forcastAirqualitySwitch.addEventListener('change', function() {
    if (this.checked) {
        domElem.forcastAirqualitySwitchLabel.style.color = "white"
        document.documentElement.style.setProperty('--afterColor',  'black')

    }else{
        domElem.forcastAirqualitySwitchLabel.style.color = "black"
        document.documentElement.style.setProperty('--afterColor',  'white')
    }
})