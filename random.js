function random(...args){
    if(args.length === 0){
       return Math.random()
    } else {
      if(args.length === 1 && typeof args[0] === 'number'){
        return Math.floor(Math.random() * args[0])
      } 
      if(args.length === 1 && typeof args[0] === 'object'){
        return args[0][Math.floor(Math.random()*args[0].length)]
      }
      if (args.length === 2){
        return args[0] + Math.floor(Math.random() * (args[1]+1-args[0]))
      }
    }
  }

module.exports = {
    random
}