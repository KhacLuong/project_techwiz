import {messageEn} from "./message-en.jsx";
import moment from "moment";

export const validateForm = (formData, validationRules) => {
    let errors = {};
    validationRules.forEach((rule) => {
        const {fieldName, validationFn, errorMessage} = rule;
        const fieldValue = formData[fieldName];

        if (typeof fieldValue === "string" && fieldValue.trim() === "") {
            // Check if the field value is an empty string (for input fields)
            errors[fieldName] = errorMessage;
        } else if (Array.isArray(fieldValue) && fieldValue.length === 0) {
            // Check if the field value is an empty array (for select options with multiple selection)
            errors[fieldName] = errorMessage;
        } else if (fieldValue instanceof FileList && fieldValue.length === 0) {
            // Check if the field value is an empty FileList (for file inputs)
            errors[fieldName] = errorMessage;
        } else if (!validationFn(fieldValue)) {
            // Perform custom validation using the provided function
            errors[fieldName] = errorMessage;
        }
    });
    return errors;
}
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Regex pattern for 10-digit phone number
    return phoneRegex.test(phoneNumber);
};
export const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword === password) {
        return null
    }
    return messageEn.errors.password.confirm_password
}
export const validateEmpty = (value) => {
    console.log(value)
    return value.trim() !== ""
}
export const validateSelectOption = (value) => {
    return value !== null || value !== 2 || value !== 0
}
export const validateLengthOfString = (value, min, max) => {
    if (value.length <= max && value.length >= min) {
        return null
    }
    return messageEn.errors.content.invalidLength(min, max)
}
export const validateFile = (file) => {
    // Check if a file is selected
    if (!file) {
        return messageEn.errors.file.isEmpty;
    }
    // Check the file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        return messageEn.errors.file.notAllowed;
    }

    // Check the file size (in bytes)
    const maxSize = 6 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return messageEn.errors.file.max;
    }
    // File is valid
    return null;
};
export const handleChangeImage = (e, setImageDefault, setImageName, setErrMsg) => {
    setErrMsg("")
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
        return;
    }
    setImageDefault(window.URL.createObjectURL(fileObj))
    setImageName(fileObj)

    // 👇️ reset file input
    e.target.value = null;
}
export const handleOpenFileInput = (inputImageRef) => {
    inputImageRef.current.click()
}
export const handleFormatPriceToVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
export const handleFormatPriceToUSD = (price) => {
    return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(price)
}
export const renderStar = (count_of_star) => {
    let data = []
    for (let i = 1; i <= count_of_star; i++) {
        data.push(`<svg aria-hidden="true" class="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                    <title>Rating star</title>
                    <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                </svg>`)
    }
    return data.join('')
}

export const getPriceMinAndMax = () => {
    
}

