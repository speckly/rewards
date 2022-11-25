/*
Name: Ritchie Yapp
Class: DISM/1A/05
Adm: p2205810
*/

class MemberGroup {
    constructor(){
        this.array = []//2d array, object Member is an element
    }
    add(member){ 
        this.array.push(member) // argument should be object Member
    }
    processDate(date) { //returns false if in correct format
        if (isNaN(Date.parse(date))){
            return true
        }
        return false
    }
    returnIndex(name){ //argument: name in type string 
        //returns the position of member object with property name matching argument
        for(var i = 0; i < this.array.length; i++){
            if (this.array[i].member[0] == name){
                return i
            }
        }
        return undefined //for processing not found case
    }
    memberInformation(index){ //index is the member's position in the array figured with function above
        var c = "" 
        var outputArr = ["Name: ", "Membership Type: ", "Date joined: ", "Date of birth: ", "Points earned: "]
        if (index != undefined){
            console.log("\n")
            for (var j = 0; j < 5; j++){
                //fetch function takes each data array's i index and compiles to c 
                c += outputArr[j] + this.array[index].member[j]
                if (j != 4){
                    c += "\n" //remove newline at the end 
                }
            }
            return c
        }
        else {
            return 'Member does not exist.' //if no real index 
        }
    }
    processPoints(a){ 
        var t = [[0, 10], [50, 50], [100, 100], [200, 200], [500, 500], [1000, 1000], [2500, 2000]]
        for (var x = t.length - 1; x >= 0; x--){ //iterates from right to left
            if (Math.ceil(a) > t[x][0]){ //else flows to advance to the next element (tier), input is ceiling to process against the correct value
                return t[x][1]
            } 
        }
        
    }
    getStatus(p){ 
        var t = [[0, "Ruby"], [500, "Gold"], [5000, "Platinum"], [20000, "Diamond"]]
        for (var x = t.length - 1; x >= 0; x--){
            if (p >= t[x][0]){ //same concept as *.processPoints()
                if (p != 0){
                    return t[x][1]
                } else {
                    return "Ruby"
                }
            }
        }
    }
}

module.exports = MemberGroup