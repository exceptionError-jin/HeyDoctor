//유효성 검사

// 유효성 검사를 수행하는 함수
function validateInput(input) {
    const fieldName = input.getAttribute("name");
    const errorTextElement = input.parentElement.querySelector(".error-text");
    let isValid = true;

    // 필드별 유효성 검사
    if (fieldName === "userEmail") {
        // 이메일 유효성 검사
        if (!validateEmail(input.value)) {
            errorTextElement.textContent = "이메일을 입력하세요.";
            isValid = false;
        } else {
            const emailInput = input.value.trim();
            if (emailInput !== "") {
                checkEmailDuplication(emailInput);
            } else {
                errorTextElement.textContent = "";
                document.getElementById("userName").disabled = false;
                document.getElementById("userPassword").disabled = false;
            }
        }
    } else if (fieldName === "userName") {
        // 닉네임 유효성 검사
        if (input.value.trim() === "") {
            errorTextElement.textContent = "이름을 입력하세요.";
            isValid = false;
        } else {
            errorTextElement.textContent = "";
        }
    } else if (fieldName === "userPassword") {
        // 비밀번호 유효성 검사
        const password = input.value;
        if (!validatePassword(password)) {
            errorTextElement.textContent = "비밀번호는 8자 이상이고 영문과 숫자를 포함해야 합니다.";
            errorTextElement.style.color = "#e92525";
            isValid = false;
        } else {
            errorTextElement.textContent = "다음 버튼을 눌러주세요.";
            errorTextElement.style.color = "#2a7de1";
        }
    }


    return isValid;
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
    // 이메일 유효성 검사를 수행하는 코드
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
    const hasValidLength = password.length >= 8;
    const hasValidFormat = /^(?=.*[A-Za-z])(?=.*\d).*$/.test(password);
    return hasValidLength && hasValidFormat;
}

// 입력 필드의 blur 이벤트 핸들러 함수
function handleBlurEvent(event) {
    const input = event.target;
    validateInput(input);
}

// 모든 입력 필드에 blur 이벤트 핸들러 등록
const inputFields = document.querySelectorAll('.inputbox');
inputFields.forEach(function (input) {
    input.addEventListener("blur", handleBlurEvent);
});

// 다음 버튼 클릭 이벤트 핸들러 함수
document.getElementById("nextButton").addEventListener("click", function () {
    const isValid = true;
    inputFields.forEach(function (input) {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
});

//이메일 중복 검
function checkEmailDuplication(email) {
    $.ajax({
        url: "/login/check-email/" + email,
        success: function (result) {
            const errorTextElement = document.getElementById("emailError");
            if (result) {
                errorTextElement.textContent = "중복된 이메일입니다.";
                errorTextElement.style.color = "#e92525";
                document.getElementById("userName").disabled = true;
                document.getElementById("userPassword").disabled = true;
            } else {
                errorTextElement.textContent = "사용 가능한 이메일입니다.";
                errorTextElement.style.color = "#2a7de1";
                document.getElementById("userName").disabled = false;
                document.getElementById("userPassword").disabled = false;
            }
        },

    });
}

//이메일 인증번호 유효성 검사
const $checkEmail = $("#checkEmail"); // 인증번호 발송 버튼
const $memailconfirm = $("#memailconfirm"); // 인증번호 확인input
const $memailconfirmTxt = $("#memailconfirmTxt"); // 인증번호 확인 txt
// 이메일 인증번호
$("#checkEmail").click(function() {
    console.log("hi");
    $.ajax({
        type : "POST",
        url : "/login/a-check",
        data : {
            "email" : $("#memail").val()
        },
        success : function(data){
            alert("해당 이메일로 인증번호 발송이 완료되었습니다. \n 확인부탁드립니다.");
            console.log("data : "+data);
            chkEmailConfirm(data, $memailconfirm, $memailconfirmTxt);
        }
    })
})


// 이메일 인증번호 체크 함수
function chkEmailConfirm(data, $memailconfirm, $memailconfirmTxt){
    $memailconfirm.on("keyup", function(){
        if (data != $memailconfirm.val()) { //
            emconfirmchk = false;
            $memailconfirmTxt.html("<span id='emconfirmchk'>인증번호가 잘못되었습니다</span>")
            $("#emconfirmchk").css({
                "color" : "#FA3E3E",
                "font-weight" : "bold",
                "font-size" : "10px"

            })
            //console.log("중복아이디");
        } else { // 아니면 중복아님
            emconfirmchk = true;
            $memailconfirmTxt.html("<span id='emconfirmchk'>인증번호 확인 완료</span>")

            $("#emconfirmchk").css({
                "color" : "#0D6EFD",
                "font-weight" : "bold",
                "font-size" : "10px"

            })
        }
    })
}