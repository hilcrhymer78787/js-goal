// モーダル
const header_icn = document.querySelector('.header_icn');
const header_nav = document.querySelector('.header_nav');

header_icn.addEventListener('click', function () {
  header_nav.classList.toggle('is-open');
});
header_nav.addEventListener('click', function () {
  this.classList.toggle('is-open');
});



// アコーディオン
const accordions = document.querySelectorAll('.accordion');

for (let i = 0; i < accordions.length; i++) {

  let accordion_body = accordions[i].querySelector('.accordion_body');
  accordion_body.style.height = '0px';
  accordion_body.style.overflow = 'hidden';
  accordion_body.style.transition = '.3s';

  accordions[i].addEventListener('click', function () {

    accordions[i].classList.toggle('active');
    accordion_body.classList.toggle('active');

    if (accordion_body.classList.contains('active')) {
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
  recruit_tab_nav[n].addEventListener('click', function () {
    for (let t = 0; t < recruit_tab_nav.length; t++) {
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
setTimeout("slideshow()", timer);

function slideshow() {
  main_slide[count].classList.remove('is-open');
  if (count <= main_slide.length - 2) {
    count++
  } else {
    count = 0
  }
  main_slide[count].classList.add('is-open');
  setTimeout("slideshow()", timer);
}



// トップへ戻る追従ボタン
let scrollY = window.pageYOffset;
let cmn_toTop = document.querySelector('#cmn_toTop');
cmn_toTop.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
});
window.addEventListener('scroll', function () {
  scrollY = window.pageYOffset;
  if (scrollY > 200) {
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
  navList[i].addEventListener('click', function () {
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
    if (scrollY + windowH > fadeContentsTop[i] + remainder) {
      fadeContents[i].classList.add('show');
    } else {
      fadeContents[i].classList.remove('show');
    }
  }
});

//フォーム
document.querySelector("#form-button").addEventListener('click', function () {
  const formName = document.querySelector("#ask-form").formName.value
  const formNameError = document.querySelector("#name-error")
  const formEmail = document.querySelector("#ask-form").formEmail.value
  const formEmailError = document.querySelector("#email-error")
  const formGender = document.querySelector("#ask-form").formGender.value
  const formGenderError = document.querySelector("#gender-error")
  const formNum = document.querySelector("#ask-form").formNum.value
  let isError = false
  formNameError.innerHTML = ""
  formEmailError.innerHTML = ""
  formGenderError.innerHTML = ""
  if (formName === "") {
    formNameError.innerHTML = "名前は必須です"
    isError = true;
  }
  if (!(/.+@.+.+/.test(formEmail))) {
    formEmailError.innerHTML = "正しい形式で入力してください"
    isError = true;
  }
  if (formGender === "") {
    formGenderError.innerHTML = "性別を選択してください"
    isError = true;
  }
  if (isError) return;
  alert(`
  送信に成功しました！！
  ーーーーーーーーーーー
  名前：${formName}
  メール：${formEmail}
  性別：${formGender}
  転職回数：${formNum}
  `);
});


//非同期通信
function createLi(parentId, key, value) {
  var elem = document.createElement('li');
  elem.innerHTML = `${key}......${value}`;
  document.querySelector(parentId).appendChild(elem);
}
fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
  .then(response => {
    return response.json();
  })
  .then(text => {
    createLi('#data_content', 'チーム名', text.squadName)
    createLi('#data_content', '活動範囲', text.homeTown)
    createLi('#data_content', '結成', text.formed)
    createLi('#data_content', '活動しているか', text.active ? 'している' : 'していない')
  })
  .catch(error => {
    alert("失敗しました");
  });