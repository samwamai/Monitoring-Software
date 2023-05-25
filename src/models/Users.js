class Users {
    
    constructor(id, username, email, password, approval, created, lastseen) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.approval = approval;
        this.created = created;
        this.lastseen = lastseen;
    }
    get id() {
        return this._id;
    }
    set id(in_id) {
        this._id = in_id;
    }

    get username() {
        return this._username;
    }
    set username(in_username) {
        this._username = in_username;
    }

    get email() {
        return this._email;
    }
    set email(in_email) {
        this._email = in_email;
    }

    get password() {
        return this._password;
    }
    set password(in_password) {
        this._password = in_password;
    }

    get approval() {
        return this._approval;
    }
    set approval(in_approval) {
        this._approval = in_approval;
    }

    get created() {
        return this._created;
    }
    set created(in_created) {
        this._created = in_created;
    }

    get lastseen() {
        return this._lastseen;
    }
    set lastseen(in_lastseen) {
        this._lastseen = in_lastseen;
    }

    register(username, email, password){
        this._username = username;
        this._email = email;
        this._password = password;
        this._approval = false;
        this._created = new Date().toISOString();
        this._lastseen = new Date().toISOString();
        return this
    } 
    login(username,password){
        this.username = username;
        this.password = password;
        return this
    }

}
module.exports = Users;
