export class UserModel{
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getUsers() {
        return users;
    }

    static createUser(data) {
        const user = new UserModel(users.length + 1, data.name, data.email, data.password);
        users.push(user);
        return user;
    }

    static loginUser(email, password) {
        const user = users.find(user => user.email == email && user.password == password);
        return user;
    }

    
}

var users = [
    new UserModel(1, "John Doe", "abj@gmail.com", "1234"),
    new UserModel(2, "Marry Jane", "abz@gmail.com", "1234"),
    new UserModel(3, "Vijay Jadon", "abc@gmail.com", "1234"),
]