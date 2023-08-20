export const messageEn = {
    errors: {
        email: {
            isInvalid: 'Email invalid',
            isEmpty: 'Email can\'t empty'
        },
        name: {
            isInvalid: 'Name invalid',
            isEmpty: 'Name can\'t empty'
        },

        password: {
            confirm_password: 'Mật khẩu nhập lại không đúng!',
            isEmpty: 'Vui lòng nhập mật khẩu!',
            isShort: 'Mật khẩu bắt buộc phải nhiều hơn 8 ký tự!',
        },
        phoneNumber: {
            isInvalid: 'Phone number invalid',
        },
        content: {
            isEmpty: "Vui lòng nhập nội dung!",
            invalidLength: (min, max)=> `Nội dung phải trong giới hạn cho phép (min: ${min}, max: ${max})`
        },
        file: {
            isEmpty: 'Vui lòng chọn ảnh!',
            max: 'Dung lượng ảnh không được vượt quá 5MB!',
            notAllowed: 'File không hợp lệ!'
        },
        role: {
            isEmpty: 'Please select role for this account'
        }
    },
    successes: 'Successfully added new'
}