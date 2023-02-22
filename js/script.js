// モーダル
const header_icn = document.querySelector('.header_icn');
const header_nav = document.querySelector('.header_nav');

header_icn.addEventListener('click',function(){
    header_nav.classList.toggle('is-open');
});
header_nav.addEventListener('click',function(){
  this.classList.toggle('is-open');
});



// アコーディオン
const accordions = document.querySelectorAll('.accordion');

for(let i= 0; i < accordions.length; i++){

    let accordion_body = accordions[i].querySelector('.accordion_body');
    accordion_body.style.height = '0px';
    accordion_body.style.overflow = 'hidden';
    accordion_body.style.transition = '.3s';
    
    accordions[i].addEventListener('click', function() {

    accordions[i].classList.toggle('active');
    accordion_body.classList.toggle('active');

    if(accordion_body.classList.contains('active')) {
      accordion_body.style.height = accordion_body.scrollHeight + 'px';
      accordion_body.style.marginTop = '15px';
    } else {
        accordion_body.style.height = '0px';
        accordion_body.style.marginTop = '0px';
    }
  });
}



// タブ切り替え
let recruit_tab_nav = document.querySelectorAll('.recruit_tab_nav');
let recruit_tab_body = document.querySelectorAll('.recruit_tab_body');
for (let i = 0; i < recruit_tab_nav.length; i++) {
  let n = i;
  recruit_tab_nav[n].addEventListener('click', function() {
    for(let t = 0; t < recruit_tab_nav.length; t++){
      recruit_tab_body[t].classList.remove('is-open');
      recruit_tab_nav[t].classList.remove('is-open');
    }
    recruit_tab_body[n].classList.add('is-open');
    recruit_tab_nav[n].classList.add('is-open');
  })
}



// スライドショー
const main_slide = document.querySelectorAll('.main_slide');
let count = 0;
const timer = 4000;

main_slide[0].classList.add('is-open');
setTimeout("slideshow()",timer);

function slideshow(){
  main_slide[count].classList.remove('is-open');
  if(count <= main_slide.length-2){
    count++
  }else{
    count = 0
  }
  main_slide[count].classList.add('is-open');
  setTimeout("slideshow()",timer);
}



// トップへ戻る追従ボタン
let scrollY = window.pageYOffset;
let cmn_toTop = document.querySelector('#cmn_toTop');
cmn_toTop.addEventListener("click", function(){
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', function () {
  scrollY = window.pageYOffset;
    if(scrollY > 200) {
        cmn_toTop.style.display = 'block';
    } 
    else {
        cmn_toTop.style.display = 'none';
    }
});




// ヘッダーナビ
let navList = document.querySelectorAll('.header_nav_list_link');
let Marker = document.querySelectorAll('.scrollNav_marker');
let MarkerTop = [];

for (let i = 0; i < Marker.length; i++) {
  MarkerTop.push(window.pageYOffset + Marker[i].getBoundingClientRect().top - 170);
}

for (let i = 0; i < navList.length; i++) {
  navList[i].addEventListener('click', function(){
    window.scroll({
      top: MarkerTop[i],
      behavior: 'smooth'
    });
  });
}



// フェードコンテンツ
let fadeContents = document.querySelectorAll('.fadeContents'); 
let fadeContentsTop = [];
let windowH = window.innerHeight;
let remainder = 50;
for (let i = 0; i < fadeContents.length; i++) {
  fadeContentsTop.push(window.pageYOffset + fadeContents[i].getBoundingClientRect().top);
}
window.addEventListener('resize', function () {
  windowH = window.innerHeight;
});
window.addEventListener('scroll', function () {
  scrollY = window.pageYOffset;
  for (var i = 0; i < fadeContents.length; i++) {
    if(scrollY + windowH > fadeContentsTop[i] + remainder) {
      fadeContents[i].classList.add('show');
    } else {
      fadeContents[i].classList.remove('show');
    }
  }
});