

window.onload=function(e){

    new Vue({
        template: '<div id="app">' +
        'Cheese Score: {{cheeseScoreToDisplay}} ' +
        '<br> Bite Score: {{bitescore}}' +
        '<br>Taste Score: {{tastescore}}'+
        '<br> Stink Score: {{stinkscore}}'+
        '<br>Creature Score: {{creaturescore}}'+
       //set up the cheese options (tiny buttons)
       '<div>' +
            '<button id="ch1" @click="changecheese(1)"><img id="ch1im" src="img/Cheese1.jpg"/></button>' +
            '<button id="ch2" @click="changecheese(2)" ><img id="ch2im" src="img/Monte_Ray.jpg"/></button>' +

            '<button id="ch3" @click="changecheese(3)"><img id="ch3im" src="img/Bluecheese.jpg"/></button>' +

            '<button id="ch4" @click="changecheese(4)"><img id="ch4im" src="img/Cream_Cheese.jpg"/></button>' +

            '<button id="ch5" @click="changecheese(5)" style="display: none" v-if="stinkLevel >= 1000"><img id="ch5im" src="img/Maggotcheese.jpg"/></button>' +

        '</div>' +
        '<br><button id="cheesebut" @click="cheeseClicked"><img id="cheeseimgbut" :src="img"/></button>' +
        '<button id="buybut" style="display: none" @click="confirmBuy">BUY</button>'+
        '<span class="rejectpop" id="rejectpopup">{{rejection}} </span>'+ 
         '</div>',

         methods: {

           changecheese(cheesetype){
            this.rejection = "";
            if (cheesetype == 1){
                this.oncheese = "cheese1";
                document.getElementById("buybut").style.display = "none";
                this.img = 'img/Cheese1.jpg';
                this.biteadd = 1;
                this.stinkb = 0;
                this.tasteb = 0;
                this.creatureb = 0;
            }
            else if (cheesetype == 2){
                if(!this.monteray){
                    this.img = "img/Monte_RayBuy.jpg";
                    document.getElementById("buybut").style.display = "block";
                }
                else{
                    this.oncheese = "monterey";
                    document.getElementById("buybut").style.display = "none";
                    this.img = 'img/Monte_Ray.jpg';
                    this.biteadd = 10;
                    this.stinkb = 1;
                    this.tasteb = 10;
                    this.creatureb = 0;
                }
            }
            else if (cheesetype == 3){
                if(!this.bluecheese){
                    this.img = "img/bluecheesebuy.jpg";
                    document.getElementById("buybut").style.display = "block";
                }
                else{
                    this.oncheese = "bluecheese";
                    document.getElementById("buybut").style.display = "none";
                    this.img ='img/Bluecheese.jpg';
                    this.biteadd = 25;
                    this.stinkb = 35;
                    this.tasteb = 0;
                    this.creatureb = 0;
                    
                }

            }
            else if (cheesetype == 4){
                if (!this.creamcheese){
                    this.img = "img/cream_cheesebuy.jpg";
                    document.getElementById("buybut").style.display = "block";
                }
                else{
                    this.oncheese = "creamcheese";
                    document.getElementById("buybut").style.display = "none";
                    this.img = 'img/Cream_Cheese.jpg',
                    this.biteadd = 50;
                    this.stinkb = 0;
                    this.tasteb = 50;
                    this.creatureb = 0;
                }

            }
            else{
                if (!this.casumarzu){
                    this.img = "img/maggotcheesebuy.jpg";
                    document.getElementById("buybut").style.display = "block";
                }
                else{
                    this.oncheese = "casumartzu";
                    document.getElementById("buybut").style.display = "none";
                    this.img ='img/Maggotcheese.jpg';
                    this.biteadd = 100;
                    this.stinkb = 50;
                    this.tasteb = -50;
                    this.creatureb = 20;
                }

            }
           },
            
            cheeseClicked(){

                this.bitescore += this.biteadd;
                this.tastescore += this.tasteb;
                this.stinkscore += this.stinkb;
                this.creaturescore += this.creatureb;
                
            },
  
            confirmBuy(){
                if(this.img == "img/Monte_RayBuy.jpg"){
                    if(this.bitescore >= 30){
                        this.bitescore -= 30;
                        this.monteray = true;
                        changecheese(2);
                    }
                    this.rejectionPopUp("monteray");
                }
                else if(this.img == "img/bluecheesebuy.jpg"){
                    if(this.bitescore >= 80 & this.tastescore >= 40){
                        this.bitescore -= 80;
                        this.tastescore -= 40;
                        this.bluecheese = true;
                        this.changecheese(3);
                    }
                    this.rejectionPopUp("blue cheese");

                }
                else if(this.img == "img/cream_cheesebuy.jpg"){
                    if(this.bitescore >= 100 & this.tastescore >= 70 & this.stinkscore >= 80){
                        this.bitescore -= 30;
                        this.creamcheese = true;
                        changecheese(4);
                    }
                    this.rejectionPopUp("cream cheese");

                }
                else{
                    if(this.bitescore >= 9000 & this.taste >= 500 & this.stink >= 2000){
                        this.bitescore -= 30;
                        this.casumarzu = true;
                        changecheese(5);
                    }
                    this.rejectionPopUp("casu martzu");
                }
            },


            rejectionPopUp(kindofcheese){
                rnum = Math.floor(Math.random() * (3 - 1 + 1) + 1);

                if(rnum == 1) this.rejection = "Sorry, you can't afford " + kindofcheese;
                if(rnum == 2) this.rejection = kindofcheese + "? I'm not sure you can handle that.";
                if(rnum == 3) this.rejection = "Come back when you're a little more mature, then you can buy " + kindofcheese;

            },





     },


         mounted(){
            setInterval(() => {
                //step function 
                if(this.oncheese == "monterey"){
                    this.tastescore += 10;
                    this.bitescore += 2;
                }
                if(this.oncheese == "bluecheese"){
                    this.bitescore += 3;
                    this.stinkscore += 20;
                }
                if(this.oncheese == "creamcheese"){
                    this.bitescore += 20;
                    this.tastescore += 20;
                }
                if(this.oncheese == "casumartzu"){
                    this.stinkscore += 100;
                    this.tastescore -= 20;
                    this.creaturescore += 100;
                    this.bitescore -= 90;
                }
                this.stinkscore += 1;
                this.tastescore -= 1;
            }, 4000);


         },

         computed: {
            //cheese score
            cheeseScoreToDisplay() {
                return this.bitescore + this.tastescore + this.stinkscore +this.creaturescore;
            },

            stinkLevel(){
                return this.stinkscore;
            }


            
         },

         watch: {

            stinkLevel(){
                document.getElementById("ch5").style.display = "block";
            }

         },

        data() {
            return {
                bitescore: 0,
                stinkscore: 0, 
                tastescore: 0,
                creaturescore: 0,

                img: 'img/Cheese1.jpg',
                biteadd: 1,
                stinkb: 0,
                tasteb: 0,
                creatureb: 0,

                monteray: false, 
                bluecheese: false,
                creamcheese: false,
                casumarzu: false,

                oncheese: "cheese1",


                rejection: "",

                events: []
    

                

            }
        },
        el: "#app",
    })
}