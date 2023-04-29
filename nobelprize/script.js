var buttonElement=document.createElement("div")
buttonElement.setAttribute("class","navbutton")
var preVal=0
var nextVal=25



buttonElement.innerHTML+=`<a href="#" class="previous round" id='previous' value=${preVal}>&#8249;</a> <a href="#" class="next round" id='next' value=${nextVal}>&#8250;</a>`
document.body.appendChild(buttonElement);
var nextBtn=document.getElementById("next")
var preBtn=document.getElementById("previous")


nextBtn.addEventListener("click",(event)=>{
   
    const nextpageURL="https://masterdataapi.nobelprize.org/2.1/nobelPrizes?offset="+nextVal
    if (nextVal >=650){
        nextVal=650
        preVal=600
    }else{
        nextVal= nextVal + 25
    }
    if (nextVal==50){
        preVal=0
    }else{
        preVal=preVal+25
    }
    
    event.target.value=nextVal
    
  
    main(nextpageURL)
})

preBtn.addEventListener("click",(event)=>{
    
    nextVal=nextVal-25
    const prepageURL="https://masterdataapi.nobelprize.org/2.1/nobelPrizes?offset="+preVal
    
    if (preVal <=25){
        preVal=0
        nextVal=25
    }else{
        preVal=preVal-25
    }
   
    event.target.value= preVal
   
    main(prepageURL)
})

async function getData(API){
   const responseObj= await fetch(API)
   const responseData=await responseObj.json()
   return responseData
   
}

function displayData(nobalData){
    
    let container=document.createElement("div")
    container.setAttribute("id","container")
    document.body.appendChild(container);
   
    for(let i=0;i<nobalData.length;i++){
        
        const awardYear=nobalData[i].awardYear
        const category=nobalData[i].categoryFullName.en
        const prizeAmount=nobalData[i].prizeAmount
        let fullName='&nbsp;'
        let description='&nbsp;'
       
        if  ((nobalData[i].laureates != undefined) && ((nobalData[i].laureates)[0].fullName !==undefined )){
            fullName =(nobalData[i].laureates)[0].fullName.en    
        }
        if  ((nobalData[i].laureates != undefined) && ((nobalData[i].laureates)[0].motivation !==undefined )){
             description=(nobalData[i].laureates)[0].motivation.en
        }
        const removeCard=document.getElementById(i)
        if (removeCard !=null){
            removeCard.remove()
        }
        
        
        let card=document.createElement("div")
        card.setAttribute("class","card")
        card.setAttribute("id",i)
        card.innerHTML+=`<h4 id="fullname">${fullName}</h4>
        <p id="year">AwardYear:${awardYear}</p>
        <p id="prizeamount">PriceAmount:${prizeAmount}</p>
        <p id="category">${category}</p>
        <p id="description">${description}</p>
        `
        
        document.getElementById("container").appendChild(card);
 
    }
    
}

function main(APIURL){
    getData(APIURL).then(responseData=>{
        displayData(responseData.nobelPrizes)

  }).catch((error)=>console.log("Error",error))

 
   
}

let nobelAPIURL="https://masterdataapi.nobelprize.org/2.1/nobelPrizes?offset=0&limit=25"
main(nobelAPIURL)

