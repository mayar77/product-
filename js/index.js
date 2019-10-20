
var prolist;
   var prName=document.getElementById("proName");
 var prDsc=document.getElementById("proDesc");
 var prPrice=document.getElementById("proPrice");
 var prCom=document.getElementById("proCompany");
  var btn=document.getElementById("myBtn");
var btn1=document.getElementById("myBtn1");
var btn2=document.getElementById("myBtn2"); 
var alertContainer=document.getElementById("alertContainer");
  var alertContainer1=document.getElementById("alertContainer1");
   var productt = document.getElementById("productt");
if (localStorage.getItem("productContainer")== null ) //y3ml check lw user gded fmsh hytl3 7aga
    {
         productt.classList.add("titleDis");
        prolist=[];
      
  
    }
else
    {
        prolist=JSON.parse(localStorage.getItem("productContainer")); //hna lw user msh gded fna tl3 data elle mwgoda gwa local storage mtsyva 3l browser//
        displayAdd(); //a3mlha display 34an tzhr fe kol mra n3ml refresh
    }
 
var productIndex=0;
      alertContainer.style.display = "none";
  alertContainer1.style.display = "none";
function teSt()
{
    
     var errors="";
    var error="";
    var nameRegex = /^[A-Z][a-zA-Z]{2,8}$/;
    var NumRegex =/^[1-9][0-9]{4}$/;
    if(nameRegex.test(prName.value) == false)
        {
            errors +="<p>productName must start with upperCase </p>";
            alertContainer.style.display = "block";
            alertContainer.innerHTML = errors;
        }
     if(NumRegex.test(prPrice.value)==false)
        {
            error +="<p>product price should between 1-1000 </p>";
            alertContainer1.style.display = "block";
            alertContainer1.innerHTML = error;
            
        }
    
    if(errors.length  > 0 && error.length >0)
        {
            return false;
        }
    else
        {
            return true;
        }
   /* var regex=/^[A-Z][a-zA-Z]{2,8}$/;*/
   /*  var priceRegex = /^[1-9][0-9]{4}$/;*/
   
}
btn.onclick=function()
{
    if (teSt() ==true)
        {
              alertContainer.style.display = "none";
              alertContainer1.style.display = "none";
    if(btn.innerHTML == "add Product")
        {
    addProduct();  
    displayAdd();
              productt.classList.add("titleDis");
    clearform();
              
        }
    else
        {
            updateproduct();
             clearform();
        }
}
}
//function add
  
function addProduct()
{
    if(isNaN(Number(prPrice.value))==true)
        {
            alert("enter a valid num");
        }
    else
        {
            var product={
                name:prName.value,
                price:prPrice.value,
                description:prDsc.value,
                company:prCom.value
                }
            prolist.push(product);
        }
    localStorage.setItem("productContainer",JSON.stringify(prolist)); //add product elle fl array fe local storage w hwa 34an byr2aha string f ana 7wltha bl json to array //
}
  //function display

function displayAdd()
{
    
    var cols="";
    
    for(i=0 ;i<prolist.length;i++)
        {
             cols+=`<div class="col-md-4 py-4">
       <p class="text-warning ">`+prolist[i].name+`</p>
       <h2 class="text-muted">`+prolist[i].price+`</h2>
       <p class="text-danger">`+prolist[i].description+` </p>
       <p class="text-info">`+prolist[i].company+`</p><button class="btn btn-danger" onclick="deleteproduct(`+i+`)">delete</button>
        <button class="btn btn-danger" onclick="setForm(`+i+`)">update</button>
        </div>`
            
            
        }
 
    document.getElementById("rowdata").innerHTML=cols;
}
 // fucntion delete
   function deleteproduct(id)
{
    
    prolist.splice(id,1);
    displayAdd();
      localStorage.setItem("productContainer",JSON.stringify(prolist));
}
  //function update
 function setForm(i)
{
       prName.value=prolist[i].name;
      prPrice.value=prolist[i].price;
     prCom.value=prolist[i].company;
     prDsc.value=prolist[i].description;
    
    btn.innerHTML="update product";
    productIndex=i;
}

 function updateproduct()
 {  prolist[productIndex].name=prName.value;
      prolist[productIndex].price=prPrice.value;
    prolist[productIndex].description=prDsc.value;
    prolist[productIndex].company=prCom.value;
    
     displayAdd(productIndex);
  btn.innerHTML="add Product";
  localStorage.setItem("prolist",JSON.stringify(prolist));
     
  }
//fucntion clear
function clearform()
{
    
    var inputs=document.getElementsByClassName("form-control");
    for(var i=0 ;i<inputs.length;i++)
        {
              inputs[i].value="";
            
        }
}

/*
btn1.onclick=function()
{
 searchpro();   
}
function searchpro()

{   
    
     for(i=0 ;i<prolist.length;i++)
       { 
          
           if( prName.value === prolist[i].name)
               
               { prPrice.value =prolist[i].price;
                   prDsc.value =prolist[i].description;
                   prCom.value =prolist[i].company;
                    
            
                   
                   
               } 
       }
}
*/

 
 // function searchs
var serc=document.getElementById("Name");
 

 
   
serc.onkeyup = function()
{    
    searchVal=serc.value;
    console.log( searchVal);
    if( searchVal.length > 0)
        {
           
              searCh();//searCh(serc.value) ;
             
        }
   
    
   
}
function searCh() //searCh(term)
{    
   var rw="";
     for(i=0 ;i<prolist.length;i++)
       { 
    
    if(prolist[i].name.includes(serc.value)) //includes(term)
        {   
           
           
           rw+=`<div class="col-md-4 py-5">
       <p class="text-warning ">`+prolist[i].name+`</p>
       <h2 class="text-muted">`+prolist[i].price+`</h2>
       <p class="text-danger">`+prolist[i].description+` </p>
       <p class="text-info">`+prolist[i].company+`</p>
        <button class="btn btn-danger" onclick="setForm(`+i+`)">update</button>
        </div>`
             
        }
       
       }
    document.getElementById("rowdata1").innerHTML=rw;
}


