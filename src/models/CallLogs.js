export default class CallLogs{

    constructor(id, address, type, date, duration, contact) {
        this.id = id;
        this.address = address;
        this.type = type;
        this.date = date;
        this.duration = duration;
        this.contact = contact;
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

    get type() {
        return this._type;
    }
    set type(in_type) {
        this._type = in_type;
    }

    get date() {
        return this._date;
    }
    set date(in_date) {
        this._date = in_date;
    }

    get duration() {
        return this._duration;
    }
    set duration(in_duration) {
        this._duration = in_duration;
    }

    get contact() {
        return this._contact;
    }
    set contact(in_contact) {
        this._contact = in_contact;
    }

}