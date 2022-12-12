
class Generator {

    static Generate(min,max){
        return Math.floor(Math.random() * ((max+1) - min) + min);
    }

}


module.exports = Generator;