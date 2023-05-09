const navBar = document.querySelector(".navBar");
const footBar = document.querySelector(".footer");

const navMenu = [
  { name: "검색", id: "search" },
  { name: "이색랭킹", id: "ranking" },
  { name: "맛집추천", id: "board" },
  { name: "즐겨찾기", id: "favorites" },
];
const footMenu = [
  { name: "공지사항", id: "announcement" },
  { name: "이용약관", id: "termsOfUse" },
  { name: "MATP정책", id: "policy" },
  { name: "고객센터", id: "serviceCenter" },
];

function makeBtn(container, items) {
  items.map(item => {
    const containerName = container.className;
    container.innerHTML += `<a href=${item.id} id=${item.id} class=${containerName}Btns>` + item.name + "</a>";
  });
}

makeBtn(navBar, navMenu);
makeBtn(footBar, footMenu);