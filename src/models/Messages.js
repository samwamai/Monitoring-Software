export default class Messages {
     
     constructor(id, threadid, address, contact, type, date, read, body) {
          this.id = id;
          this.threadid = threadid;
          this.address = address;
          this.contact = contact;
          this.type = type;
          this.date = date;
          this.read = read;
          this.body = body
     }

     get id() {
          return this._id;
     }
     set id(in_id) {
          this._id = in_id;
     }

     get threadid() {
          return this._threadid;
     }
     set threadid(in_threadid) {
          this._threadid = in_threadid;
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

     get read() {
          return this._read;
     }
     set read(in_read) {
          this._read = in_read;
     }

     get body() {
          return this._body;
     }
     set body(in_body) {
          this._body = in_body;
     }

}