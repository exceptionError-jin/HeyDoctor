const $checkboxs = $(".checkbox-wrap input[type='checkbox']");
const $checkAll = $("input[name='checkAll']");
const $checks = $("input[name='check']");
const $optionsAll = $(".options-title input[name='check']");
const $options = $(".options-list input[name='check']");

// "checkAll" 체크박스 변경
$checkAll.on("change", function(){
    let isChecked = $(this).prop("checked");

    // "checkAll" 체크 여부에 따라 함수 호출
    isChecked ? checkedAll() : notCheckedAll();

    // 모든 $checks 체크박스의 상태 변경 및 "change" 이벤트 트리거
    $checks.prop("checked", isChecked);
    $checks.trigger("change");
});

// 개별 체크박스의 변경 이벤트 핸들러
$checks.on("change", function(){
    let isChecked = $(this).prop("checked");
    let $img = $(this).next().find("img");

    // 체크 여부에 따라 함수 호출
    isChecked ? checked($img) : notChecked($img);
});

// "optionsAll" 체크박스 변경
$optionsAll.on("change", function(){
    $options.prop("checked", $(".options-title input[type='checkbox']").prop("checked"));
    $(".options-list .checkbox-wrap img").attr("src", "/image/icon/" + ($(this).prop("checked") ? "checked.png" : "check.png"));
});

// 개별 옵션 체크박스 변경
$options.on("change", function(){
    $(".options-title input[type='checkbox']").prop("checked", $options.filter(":checked").length);
    $(".options-title .checkbox-wrap img").attr("src", "/image/icon/" + ($(".options-title input[type='checkbox']").prop("checked") ? "checked.png" : "check.png"));
});

// 모든 체크박스 변경
$checkboxs.on("change", function(){
    if($checkboxs.length === $checkboxs.filter(":checked").length){
        $checkAll.prop("checked", true);
        checkedAll();
        return;
    }
    $checkAll.prop("checked", false);
    notCheckedAll();
});

// 전체 체크된 상태
function checkedAll(){
    $("#check-all-wrap span.checkbox").css("border-color", "#2a7de1");
    $("#check-all-wrap span.checkbox").css("background-color", "#2a7de1");
}

// 전체 체크 해제 상태
function notCheckedAll(){
    $("#check-all-wrap span.checkbox").css("border-color", "");
    $("#check-all-wrap span.checkbox").css("background-color", "");
}

// 체크된 상태
function checked($img){
    $img.attr("src", "/image/icon/checked.png");
    checkAvailable();
}

// 체크 해제 상태
function notChecked($img){
    $img.attr("src", "/image/icon/check.png");
    checkAvailable();
}

// 체크 가능 여부 확인
function checkAvailable(){
    if($("#enable").prop("checked")){
        $("li.options").removeClass("disable");
        return;
    }
    $("li.options").addClass("disable");
    $(".options input[type='checkbox']").prop("checked", false);
    $(".options input[type='checkbox']").next().find("img").attr("src", "/image/icon/check.png");
}
