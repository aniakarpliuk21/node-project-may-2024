export const regexConstans = {
    NAME: /^[A-Z][a-zA-Z]{1,19}$/,
    EMAIL:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    PHONE: /^[a-z0-9_-]+$/,
    TITLE: /^[\p{L}\p{N}.,!?()"\s-]{5,100}$/u,
    CONTENT: /^[\p{L}\p{N}.,!?()"\s\-\n]{10,5000}$/u
};