const  checkbox = document.getElementById("checkbox")

document.addEventListener('DOMContentLoaded', () => {
    checkbox.addEventListener("change", function(){
        if(checkbox.checked) {
            document.body.classList.add("light-mode")
            localStorage.setItem("lightMode" , "enabled" )    
        } else {
            document.body.classList.remove("light-mode")
            localStorage.setItem("lightMode" , "disabled")
        }
    })

    if (localStorage.getItem("lightMode") === "enabled") {
        checkbox.checked = true 
        document.body.classList.add("light-mode")
    }

})



let title = document.getElementById("title")
let num   = document.getElementById("num")
let tax   = document.getElementById("tax")
let ads   = document.getElementById("ads")
let dis   = document.getElementById("dis")
let tot   = document.querySelector(".total")
let count = document.getElementById("count")
let cate  = document.getElementById("category")
let create = document.getElementById("create")
let deleteAll = document.getElementById("deleteAll")
let save = document.getElementById("save")
let search = document.getElementById("search")
let sbt = document.getElementById("sbt")
let sbc = document.getElementById("sbc")
let searchM = "title"



let elementArr ;
if (localStorage.specs != null) {
    elementArr= JSON.parse(localStorage.specs)
} else {
    elementArr = []
}

function getTotal() {
    if (Number(num.value) > 0) {
        let totVal = Number( num.value) + Math.abs(Number(tax.value))  + Math.abs(Number(ads.value)) - Math.abs(Number(dis.value))
        tot.innerText = "Total: " + totVal
        tot.style.background = "#040"
        tot.style.color= "var(--btntextcolor)"
    } else {
        tot.innerText = "Enter A Price"
        tot.style.background = "#8d1414e3"
        tot.style.color= "var(--btntextcolor)"
    }
}



create.onclick = function() {
    if ( num.value > 0 && count.value > 0 && cate.value ) {
        let newOpj = {
            Title: title.value.toLowerCase(),
            Price: +num.value,
            Taxes: +tax.value,
            Ads: +ads.value , 
            Discount: +dis.value,
            Total: ( Math.abs(Number(num.value)) + Math.abs(Number(tax.value) * -1)  + Math.abs(Number(ads.value)) ) - Math.abs(Number(dis.value)),
            Count: count.value,
            Category: cate.value.toLowerCase()
        }    
        elementArr.push(newOpj)
        localStorage.setItem("specs" , JSON.stringify(elementArr))
        clearData()
    }  else {
        console.log("Empty")
    }
    
    save.style.display = "none" 

    addData()
    delUp()
}
addData()
delUp()

function clearData() {
    title.value=""
    num.value =""
    tax.value=""
    ads.value=""
    dis.value = ""
    tot.innerHTML="Total: 0"
    tot.style.background = "#8d1414e3"
    count.value=""
    cate.value=""
}

function delUp() {
    deleteAll.innerHTML = `Delete All (${elementArr.length})`
}

function addData() {
    let table = ""

    for (let i = 0 ; i < elementArr.length ; i++) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${elementArr[i].Title}</td>
                    <td>${elementArr[i].Price}</td>
                    <td>${elementArr[i].Taxes}</td>
                    <td>${elementArr[i].Ads}</td>
                    <td>${elementArr[i].Discount}</td>
                    <td>${elementArr[i].Total}</td>
                    <td>${elementArr[i].Count}</td>
                    <td>${elementArr[i].Category}</td>
                    <td><button onclick="update(${i})" class="btn tab">Update</button></td>
                    <td>
                        <button onclick="deleteSing(${i})" style="margin-right: 8px" class="btn tab">Delete</button>
                        <button id="delOne" onclick="deleteOne(${i})"  class="btn tab">Delete One</button>
                    </td>
                </tr>
        `
    }
    document.querySelector(".tbody").innerHTML = table
}

deleteAll.onclick = function () {
    elementArr = []
    localStorage.specs=JSON.stringify(elementArr)
    addData()
    delUp()
}

function deleteSing(i) {
    elementArr.splice(i , 1)
    localStorage.specs = JSON.stringify(elementArr)
    addData()
    delUp()
    console.log(i)
}

function deleteOne(i) {

        if (elementArr[i].Count > 1) {
            elementArr[i].Count -= 1
        } else {
            elementArr.splice(i , 1) 
        }
        localStorage.specs = JSON.stringify(elementArr)
        addData()
        delUp()
    }

function update(i) {
    title.value = elementArr[i].Title
    num.value = elementArr[i].Price
    tax.value = elementArr[i].Taxes
    ads.value = elementArr[i].Ads
    dis.value = elementArr[i].Discount
    tot.value = elementArr[i].Total
    count.value = elementArr[i].Count
    cate.value = elementArr[i].Category
    save.innerHTML = `
    <button onclick=" saveData(${i}) " class="btn" style=" width:100% " >Save</button>
    `
    save.style.display = "block" 
    scroll ({
        top: 0 , 
        behavior: 'smooth' ,
    })
}

function saveData(i) {
    console.log("Save")
    elementArr[i].Title = title.value 
    elementArr[i].Price = num.value 
    elementArr[i].Taxes = tax.value 
    elementArr[i].Ads = ads.value 
    elementArr[i].Discount = dis.value  
    elementArr[i].Total = ( Number(num.value) + Number(tax.value)  + Number(ads.value) ) - Number(dis.value) 
    elementArr[i].Count = count.value 
    elementArr[i].Category = cate.value 
    localStorage.specs = JSON.stringify(elementArr)
    addData()
    clearData()
    save.style.display = "none" 
}

function searchMode(id) {
    if (id === "sbt") {
        searchM = "title"
        search.placeholder = "Search By Title"
    } else {
        searchM = "category"
        search.placeholder = "Search By Category"
    }
    console.log(searchM)
    search.value = ""
    search.focus()
    addData()
}

function searchData(value) {
    let table = ""

    if (searchM === "title") {
        for (let i = 0 ; i < elementArr.length ; i++) {
            if (elementArr[i].Title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${elementArr[i].Title}</td>
                    <td>${elementArr[i].Price}</td>
                    <td>${elementArr[i].Taxes}</td>
                    <td>${elementArr[i].Ads}</td>
                    <td>${elementArr[i].Discount}</td>
                    <td>${elementArr[i].Total}</td>
                    <td>${elementArr[i].Count}</td>
                    <td>${elementArr[i].Category}</td>
                    <td><button onclick="update(${i})" class="btn tab">Update</button></td>
                    <td>
                        <button onclick="deleteSing(${i})" class="btn tab">Delete</button>
                        <button id="delOne" onclick="deleteOne(${i})"  class="btn tab">Delete One</button>
                    </td>
                </tr>
            `
            }
        }
    } else {
        for (let i = 0 ; i < elementArr.length ; i++) {
            if (elementArr[i].Category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${elementArr[i].Title}</td>
                    <td>${elementArr[i].Price}</td>
                    <td>${elementArr[i].Taxes}</td>
                    <td>${elementArr[i].Ads}</td>
                    <td>${elementArr[i].Discount}</td>
                    <td>${elementArr[i].Total}</td>
                    <td>${elementArr[i].Count}</td>
                    <td>${elementArr[i].Category}</td>
                    <td><button onclick="update(${i})" class="btn tab">Update</button></td>
                    <td>
                        <button onclick="deleteSing(${i})" class="btn tab">Delete</button>
                        <button id="delOne" onclick="deleteOne(${i})"  class="btn tab">Delete One</button>
                    </td>
                </tr>
            `
            }
        }
    }
    document.querySelector(".tbody").innerHTML = table
}