const STEPS = {
    shopcart: {
        title: "Shopcart",
        description: "Please Confirm your shopcart"    
    },
    login: {
        title: "Login",
        description: "Login or register for our full service"    
    },
    payment: {
        title: "Payment",
        description: "Allow credit cards or checks"    
    },
    invoice: {
        title: "Shopcart",
        description: "You can print the invoice now"    
    }
}

var app = new Vue({
    el: "#app",
    data: {
        currentStep: 0,
        steps: null
    },
    methods: {
        updateCurrentStep(num){
            this.currentStep +=num;
        }
    },
    created() {
        this.steps = STEPS;
    }
})