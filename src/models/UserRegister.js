export class UserRegister {
    constructor(username, email, name, birthdate, password, confirmPassword) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.birthdate = birthdate;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    validate() {
        const errors = [];

        if (!this.username || this.username.trim().length < 5) {
            errors.push('Username must be at least 3 characters long');
        }

        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!this.name || this.name.trim().length < 5) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!this.birthdate) {
            errors.push('Birthdate is required');
        }

        if (!this.password || this.password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        if (this.password !== this.confirmPassword) {
            errors.push('Passwords do not match');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
            birthdate: this.birthdate,
            password: this.password,
            confirmPassword: this.confirmPassword
        };
    }
}
