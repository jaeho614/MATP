const navMenu = ["검색", "이색랭킹", "맛집추천", "즐겨찾기"];
const footMenu = ["공지사항", "이용약관", "MATP정책", "고객센터"];
const navBar = document.querySelector(".navBar");
const footBar = document.querySelector(".footer");

console.log(navBar.clasName);
function makeBtn(container, items){
    items.map(item => {
        const button = document.createElement("button");
        container.appendChild(button);
        button.classList = `${container}Btns`;
        button.innerHTML = item;
    })
}

makeBtn(navBar, navMenu);
makeBtn(footBar, footMenu);