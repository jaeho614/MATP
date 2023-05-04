// document.getElementById('userForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const id = e.target.join_id.value;
//     const nick = e.target.join_nick.value;
//     const pwd = e.target.join_password.value;
//     const name = e.target.join_name.value;
//     const birthday = e.target.join_birthday.value;
//     const phone = e.target.join_phone.value;
//     const email = e.target.join_email.value;
//     const addr = e.target.join_region.value;
    // const isValidId = (id) => {
    //     return /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(id);
    // }

    // const isValidEmail = (email) => {
    //     return /^[\w.%+\-]+@[\w.\-]+\.[A-Za-z]{2,3}$/.test(email);
    // }

    // const IsValidatePhoneNumber = (phone) => {
    //     return /^\d{2,3}-\d{3,4}-\d{4}$/.test(phone);
    //   }

    // if (!isValidId(id)) {
    //     return alert("잘못된 ID 입니다.");
    // } else if (!id){
    //     return alert('이름을 입력하세요');
    // }
    // if (!nick) {
    //   return alert('닉네임을 입력하세요');
    // }
    // if (!pwd) {
    //   return alert('비밀번호를 입력하세요');
    // }
    // if (!name) {
    //   return alert('이름을 입력하세요');
    // }
    // if (!birthday) {
    //   return alert('생년월일을 입력하세요');
    // }
    // if (!IsValidatePhoneNumber(phone)) {
    //   return alert('전화번호 양식이 잘못되었습니다.');
    // } else if (!phone) { 
    //   return alert('전화번호를 입력하세요');
    // }

    // if (!isValidEmail(email)) {
    //   return alert('이메일 양식이 잘못되었습니다.');
    // } else if (!email) {
    //     return alert("이메일을 입력해주세요.");
    // }
    // if (!addr) {
    //   return alert('지역을 입력하세요');
    // }
    // try {
    // //   await axios.post('/join', { id, nick, pwd, name, birthday, phone, email, addr});
    // //   getUser();
    // } catch (err) {
    //   console.error(err);
    // }
    // e.target.id.value = '';
    // e.target.nick.value = '';
    // e.target.name.checked = false;
//   });

//   // https://mniyunsu.github.io/js-regexp/

const id = document.querySelector("#join_id");
const idChkBtn = document.querySelector("#idChkBtn");

idChkBtn.addEventListener("click",idChkFn);

function idChkFn(event){
    event.preventDefault();
    const userId = id.value;
    console.log(userId);
}