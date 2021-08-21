import Swal from "sweetalert2";

export const onError = (text : string, confirmAction : () => void) => {
    Swal.fire({
        title : '오류 발생',
        icon : 'error',
        text,
        confirmButtonText : '확인',
        confirmButtonColor : '#337DFF'
    }).then((res) => {
        if(res.isConfirmed) {
            confirmAction();
        }
    });
};

export const onSuccess = (text : string, successAction : () => void) => {
    Swal.fire({
        title : '성공',
        icon : 'success',
        text,
        showConfirmButton : false,
        timer : 1500,
    }).then(res => {
        successAction();
    });
};

export const onCheck = (text : string, confirmAction : () => void, denyAction : () => void) => {
    Swal.fire({
        title : '확인',
        icon : 'question',
        text,
        confirmButtonText : '확인',
        confirmButtonColor : '#337DFF',
        showDenyButton : true,
        denyButtonText : '취소',
        denyButtonColor : '#343434',
    }).then(res => {
        if(res.isConfirmed) {
            confirmAction();
        } else if(res.isDenied) {
            denyAction();
        }
    });
};

export const onWarning = (text : string, confirmAction : () => void) => {
    Swal.fire({
        title : '주의',
        icon : 'warning',
        text,
        confirmButtonText : '확인',
        confirmButtonColor : '#337DFF',
    }).then(res => {
        if(res.isConfirmed) {
            confirmAction();
        }
    });
};