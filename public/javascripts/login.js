const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", async (event) => {
    const id = document.querySelector("#login-id").value;
    const password = document.querySelector("#login-password").value;
    event.preventDefault();
    return await axios
        .post("/auth/login", {id: id, password: password})
        .then((request) => {
            const {message} = request.data;
            if(message){
                return alert(message);
            } else {
                location.href = "/";
            }
        })
        .catch((error) => {
            console.error(error);
        })
});

const searchId = document.querySelector("#searchId");
const searchPw = document.querySelector("#searchPw");

searchId.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("searchId", "아이디찾기", "width=400, height=400, left=100, top=50");
});

searchPw.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("searchPw", "비밀번호찾기", "width=400, height=400, left=100, top=50");

});