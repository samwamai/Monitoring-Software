export default class Contacts{

    constructor(id, address, contact, photo, email, timesContacted, lastContacted) {
        this.id = id;
        this.address = address;
        this.contact = contact;
        this.photo = photo;
        this.email = email;
        this.timesContacted = timesContacted;
        this.lastContacted = lastContacted
    }
    
    get id() {
        return this._id;
    }
    set id(in_id) {
        this._id = in_id;
    }

    get address() {
        return this._address;
    }
    set address(in_address) {
        this._address = in_address;
    }

    get contact() {
        return this._contact;
    }
    set contact(in_contact) {
        this._contact = in_contact;
    }

    get photo() {
        return this._photo;
    }
    set photo(in_photo) {
        this._photo = in_photo;
    }

    get email() {
        return this._email;
    }
    set email(in_email) {
        this._email = in_email;
    }

    get timesContacted() {
        return this._timesContacted;
    }
    set timesContacted(in_timesContacted) {
        this._timesContacted = in_timesContacted;
    }

    get lastContacted() {
        return this._lastContacted;
    }
    set lastContacted(in_lastContacted) {
        this._lastContacted = in_lastContacted;
    }

    
}