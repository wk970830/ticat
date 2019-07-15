//轮播图:
//获取元素:
let $autoMove = $("#autoMove");
let $wrapper = $("#wrapper");
let $silde = null;
let $focus = $("#focus");
//ajax:
$.ajax({
    url:"json/banner.json",
    method:"GET",
    async:false,
    dataType:"json",
    error(){

    },
    success(data){
    bindHTML(data);
    }
    
})
//绑定数据:
function bindHTML(data){
    let imgStr = "";
    let focusStr = "";
    data.forEach((v,i)=>{
    let {img} = v;
    imgStr +=`<div class="silde" style='width:1230px'><img src="${img}" alt=""></div> `;
    focusStr +=  `<li class="${i === 0 ? "active" : ""}"></li>`;
})
//无缝轮播:
imgStr +=`<div class="silde" style='width:1230px'><img src="${data[0].img}" alt=""></div> `;
    $wrapper.html(imgStr);
    $focus.html(focusStr)
}
//重新获取:

$silde = $(".silde");
$focusList = $("#focus > li");

//让图片在一行:
$wrapper.css({
    width: $silde.length *1230
})
let index = 0;
function autoMove(){
    index++;
if(index >= $silde.length){
    index = 1;
    $wrapper.css({
        left: 0
      })
}
$wrapper.finish().animate({
    left: -index * 1230
  }, 200);
  focusSwitch()
}
autoMove()
autoTimer = setInterval(autoMove, 2000);
//点点切换:
function focusSwitch(){
    let focusIndex = index;
    if(focusIndex >= $silde.length-1){
        focusIndex = 0;
    }
    $focusList.eq(focusIndex).addClass('active').siblings().removeClass('active')
}
focusSwitch()
//搜索下拉框:
let navTwo = document.getElementById("nav-2");
let input = document.getElementsByTagName("input")[0];
let ul = document.getElementsByClassName("inputMassage")[0];
input.oninput = function(){
    ul.style.display = "block"
    let inputValue = input.value;
    let xhr = new XMLHttpRequest;
    xhr.open("get",`json/data.json?keyword=${inputValue}`,false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status ===200){
            newList = JSON.parse(xhr.response);
        }
    }
    xhr.send();
    let str ="";
    let {data} = newList;
    let regRepalce = new RegExp(inputValue,"ig");
    for(let i=0; i<data.length; i++){
        data[i] = data[i].replace(regRepalce,function(a,b){
            return `<span style="color: red;">${a}</span>`
        })
        str += `<li>${data[i]}</li>`
    }
    ul.innerHTML = str;
}
input.onblur = function(){
    ul.style.display = "none"
    input.value ="   搜索 天猫商品/品牌/店铺";
}

