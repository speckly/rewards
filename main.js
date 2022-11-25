/*
Author: Ritchie Yapp
Class: DISM/1A/05
Adm: p2205810
*/

//get information by main.array[memberindex].member[0 to 4 positional member data]
var Member = require('./member.js')
var MemberGroup = require('./membergroup.js')
var input = require('readline-sync')
var tempName = "", tempInput = "", tempNumber = 0  //temporary processing strs
var main = new MemberGroup() //this is the main company with Members, another MemberGroup can be created for other companies
function capit(string){
    return string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
}


//main
console.log("Welcome to XYZ Membership Loyalty Programme!")
tempName = capit(input.question("Please enter your name: "))
while (tempNumber != 8){
    //input menu option
    console.log(`\n\nHi ${tempName}, please select your choice:\n\t1. Display all members' information\n\t2. Display member information\n\t3. Add new member\n\t4. Update points earned\n\t5. Statistics\n\t6. Delete member\n\t7. Modify member information\n\t8. Exit`)
    tempInput = input.question("\t>> ")
    tempNumber = parseInt(tempInput)
    //validation and processing request
    if (tempNumber < 1 || tempNumber > 8 || isNaN(tempInput) || tempInput == "" || tempInput.includes(".")) 
    {
        console.log("Please enter a valid input.")
    } else {
        switch (tempNumber){
            case 1:
                if (main.array.length != 0){ //case of blank database
                    for (var i = 0; i < main.array.length; i++){ //recursively logs the member's contents
                        console.log(main.memberInformation(i))
                    }
                }
                else {
                    console.log("\nNo members found\n") 
                }
                break
            case 2: //searches for the index and passes it to .memberInformation(arg)
                console.log(main.memberInformation(main.returnIndex(capit(input.question('Please enter member\'s name: ')))))
                break
            case 3:
                var i = "", j = "", k = "", returnedIndex = 0;
                do {
                    i = capit(input.question('Please enter member\'s name: '))
                    returnedIndex = main.returnIndex(i)
                    if (returnedIndex != undefined){
                        console.log('\nMember\'s name already exists in database. Please enter a new name')
                    }
                } while (returnedIndex != undefined)
                do {
                    j = input.question('Please enter member\'s date of birth: ')
                    if (main.processDate(j)){
                        console.log("Date of birth invalid, please try again\n")
                    }
                } while (main.processDate(j))
                
                var today = new Date() 
                var dd = String(today.getDate()).padStart(2, '0')
                var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!var yyyy = today.getFullYear();
                var yyyy = today.getFullYear();
                var k = `${dd}-${mm}-${yyyy}`
                main.add(new Member(i, "Ruby", k, j, 0))
                break
            case 4:
                var i = undefined, p = 0, s = "";
                i = capit(input.question('Please enter member\'s name: '))
                i = main.returnIndex(i)
                if (i == undefined){
                    console.log("Member does not exist.")
                    break
                }
                p = main.processPoints(input.question("Please enter amount spent: "))
                main.array[i].member[4] += p
                s = main.getStatus(main.array[i].member[4])
                main.array[i].member[1] = s
                //console.log(`\nSucessfully added ${p} points to ${main.array[i].member[0]}, their membership status is ${s}`)
                break
            case 5:
                do {
                    console.log("\n\tPlease select and option from the submenu:\n\t1. Display names of (all) a certain type of members only.\n\t2. Display the name of the youngest and oldest member in the system.\n\t3. Display the name of members with the highest and lowest points earned\n\t4. Display total number of members in each membership type.\n\t5. Display the total points in each membership type\n\t6. Return to main-menu")
                    do {
                        tempInput = input.question("\t>> ")
                        tempNumber = parseInt(tempInput)
                        if (tempNumber < 0 || tempNumber > 7 || isNaN(tempInput) || tempInput.includes(".")){
                            console.log("\n\tPlease try again")
                        }
                    } while(tempNumber < 0 || tempNumber > 7 || isNaN(tempInput) || tempInput.includes("."))
                    switch (tempInput){
                        case "1":
                            var c = "", v = false, d = ["Ruby", "Gold", "Platinum", "Diamond"], count = 0;
                            do {
                                c = capit(input.question("\n\tEnter membership type: "))
                                for (var x = 0; x < d.length; x++){
                                    if (c == d[x]){
                                        v = true
                                    }
                                }
                                if (v == false){
                                    console.log("\tPlease enter a valid membership type.")
                                }
                            } while (v == false)
                            if (v == false){
                                break //from the v == false case to return
                            }
                            for (var i = 0; i < main.array.length; i++){
                                if (main.array[i].member[1] == c){
                                    console.log(main.memberInformation(i))
                                    count += 1
                                }
                            }
                            if (count == 0){
                                console.log("\n\tNo results were found")
                            }
                            break
                        case "2":
                            count = 0, oldest = [Date.now(), ""], youngest = [-2208988800, ""], prc = ""
                            if (main.array.length != 0){    
                                for (var i = 0; i < main.array.length; i++){
                                    v = Date.parse(main.array[i].member[3])
                                    if (v > youngest[0]){
                                        youngest[0] = v
                                        youngest[1] = main.array[i].member[3]
                                    }
                                    if (v < oldest[0]){
                                        oldest[0] = v
                                        oldest[1] = main.array[i].member[3]
                                    }
                                }
                                for (var i = 0; i < main.array.length; i++){
                                    if (main.array[i].member[3] == youngest[1]){
                                        prc += main.array[i].member[0] 
                                        prc += ", "
                                    }
                                }
                                if (prc.slice(-2) == ", "){
                                    prc = prc.slice(0, -2)
                                }
                                console.log("\tYoungest member: " + prc)
                                prc = ""
                                for (var i = 0; i < main.array.length; i++){
                                    if (main.array[i].member[3] == oldest[1]){
                                        prc += main.array[i].member[0] 
                                        prc += ", "
                                    }
                                }
                                if (prc.slice(-2) == ", "){
                                    prc = prc.slice(0, -2)
                                }
                                console.log("\tOldest member: " + prc)
                            } else {
                                console.log("\n\tNo members found\n")
                            }   
                            break
                        case "3":
                            //similar to case 2
                            var lowest = 1e50, highest = 0, prc = ""
                            if (main.array.length != 0){
                                for (var i = 0; i < main.array.length; i++){
                                    if (main.array[i].member[4] < lowest){
                                        lowest = main.array[i].member[4]
                                    } 
                                    if (main.array[i].member[4] > highest){
                                        highest = main.array[i].member[4]
                                    }
                                }
                                for (var i = 0; i < main.array.length; i++){
                                    if (main.array[i].member[4] == lowest){
                                        prc += main.array[i].member[0] 
                                        prc += ", "
                                    }
                                }
                                if (prc.slice(-2) == ", "){
                                    prc = prc.slice(0, -2)
                                }
                                console.log("\tLowest points: " + prc)
                                prc = ""
                                for (var i = 0; i < main.array.length; i++){
                                    if (main.array[i].member[4] == highest){
                                        prc += main.array[i].member[0] 
                                        prc += ", "
                                    }
                                }
                                if (prc.slice(-2) == ", "){
                                    prc = prc.slice(0, -2)
                                }
                                
                                console.log("\tHighest points: " + prc)
                            } else {
                                console.log("\nNo members found\n")
                            }
                            break
                        case "4":
                            var counts = {"ruby": 0, "gold": 0, "platinum": 0, "diamond": 0}
                            for (var i = 0; i < main.array.length; i++){
                                if (main.array[i].member[1] == "Ruby"){
                                    counts.ruby += 1
                                } else if (main.array[i].member[1] == "Gold"){
                                    counts.gold += 1
                                } else if (main.array[i].member[1] == "Platinum"){
                                    counts.platinum += 1
                                } else {
                                    counts.diamond += 1
                                }
                            }
                            console.log(`\nruby: ${counts.ruby}\ngold: ${counts.gold}\nplatinum: ${counts.platinum}\ndiamond: ${counts.diamond}`)
                            break
                        case "5":
                            var points = {"ruby": 0, "gold": 0, "platinum": 0, "diamond": 0}
                            for (var i = 0; i < main.array.length; i++){
                                var memberType = main.array[i].member[1], memberPoints = main.array[i].member[4]
                                if (memberType == "Ruby"){
                                    points.ruby += memberPoints
                                } else if (memberType == "Gold"){
                                    points.gold += memberPoints
                                } else if (memberType == "Platinum"){
                                    points.platinum += memberPoints
                                } else {
                                    points.diamond += memberPoints
                                }
                            }
                            console.log(`\nTotal points of Ruby status: ${points.ruby}\nTotal points of Gold status: ${points.gold}\nTotal points of Platinum status: ${points.platinum}\nTotal points of Diamond status: ${points.diamond}`)
                            break
                        case "6":
                            break
                    }
                } while (tempInput != 6)
                break  
            case 6: 
                var i = undefined, q = ""
                while (i == undefined){
                    i = capit(input.question('Please enter member\'s name (enter 0 to return): '))
                    if (i == "0"){
                        i = undefined
                        break
                    }
                    i = main.returnIndex(i)
                    if (i == undefined){
                        console.log("Member does not exist\n")
                    }
                }
                if (i == undefined){
                    break //from the i == 0 case to return
                }
                q = input.question("\nPlease answer \"Y\" to confirm deletion of member " + main.array[i].member[0] + ": ")
                if (q.toLowerCase() == "y"){
                    main.array.splice(i)
                    console.log("\nDeleted")
                } else {
                    console.log("Cancelling deletion of member")
                    break
                }
                break
            case 7:
                var i = undefined, q = ["Name", "DOB"] 
                while (i == undefined){
                    i = capit(input.question('Please enter member\'s name (enter 0 to return): '))
                    if (i == "0"){
                        i = undefined
                        break
                    }
                    i = main.returnIndex(i)
                    if (i == undefined){
                        console.log("Member does not exist\n")
                    }
                }
                if (i == undefined){
                    break //from the i == 0 case to return
                }
                console.log("\n**If a specific data does not need to be modified, press enter for that question**")
                q[0] = capit(input.question("Enter new name of member: "))
                do {
                    q[1] = input.question('Please enter member\'s date of birth: ')
                    if (main.processDate(q[1]) && q[1] != ""){
                        console.log("Date of birth invalid, please try again\n")
                    }
                    if (q[1] == ""){
                        break
                    }
                } while (main.processDate(q[1]))
                if (q[0] != ""){
                    main.array[i].member[0] = q[0]}
                if (q[1] != ""){
                    main.array[i].member[3] = q[1]}
                console.log("\nSuccessfully updated")
                break
            case 8:
                console.log("Thank you and goodbye!")
                break
        }
    }
}