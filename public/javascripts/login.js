// const loginBtn = document.querySelector("#loginBtn");

// loginBtn.addEventListener("click", async (event) => {
//     const id = document.querySelector("#login-id").value;
//     const password = document.querySelector("#login-password").value;

//     event.preventDefault();
//     return await axios
//         .post("/auth/login", {id: id, password: password})
//         .then((request) => {
//             const {message} = request.data;
//             alert(message);
//         })
//         .catch((error) => {
//             console.error(error);
//         })
// });