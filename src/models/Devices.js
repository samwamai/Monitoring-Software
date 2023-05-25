export default class Devices {

    constructor(id,bindid,imei,carrier,battery,connection,userbind,device,os,
        binddate,lastseen,root,sdinternal,sdexternal,phoneinfo,networkinfo,
        hardwareinfo, sensorinfo, accounts, appversion, lastwifi, ringmode) {

        this.id = id;
        this.bindid = bindid;
        this.imei = imei;
        this.carrier = carrier;
        this.battery = battery;
        this.connection = connection;
        this.userbind = userbind;
        this.device = device;
        this.os = os;
        this.binddate = binddate;
        this.lastseen = lastseen;
        this.root = root;
        this.sdinternal = sdinternal;
        this.sdexternal = sdexternal;
        this.phoneinfo = phoneinfo;
        this.networkinfo = networkinfo;
        this.hardwareinfo = hardwareinfo;
        this.sensorinfo = sensorinfo;
        this.accounts = accounts;
        this.appversion = appversion;
        this.lastwifi = lastwifi;
        this.ringmode = ringmode;
		}

    get id() {
        return this._id;
    }
    set id(in_id) {
        this._id = in_id;
    }

    get bindid() {
        return this._bindid;
    }
    set bindid(in_bindid) {
        this._bindid = in_bindid;
    }

    get imei() {
        return this._imei;
    }
    set imei(in_imei) {
        this._imei = in_imei;
    }

    get carrier() {
        return this._carrier;
    }
    set carrier(in_carrier) {
        this._carrier = in_carrier;
    }

    get battery() {
        return this._battery;
    }
    set battery(in_battery) {
        this._battery = in_battery;
    }

    get connection() {
        return this._connection;
    }
    set connection(in_connection) {
        this._connection = in_connection;
    }

    get userbind() {
        return this._userbind;
    }
    set userbind(in_userbind) {
        this._userbind = in_userbind;
    }

    get device() {
        return this._device;
    }
    set device(in_device) {
        this._device = in_device;
    }

    get os() {
        return this._os;
    }
    set os(in_os) {
        this._os = in_os;
    }

    get binddate() {
        return this._binddate;
    }
    set binddate(in_binddate) {
        this._binddate = in_binddate;
    }

    get lastseen() {
        return this._lastseen;
    }
    set lastseen(in_lastseen) {
        this._lastseen = in_lastseen;
    }

    get root() {
        return this._root;
    }
    set root(in_root) {
        this._root = in_root;
    }

    get sdinternal() {
        return this._sdinternal;
    }
    set sdinternal(in_sdinternal) {
        this._sdinternal = in_sdinternal;
    }

    get sdexternal() {
        return this._sdexternal;
    }
    set sdexternal(in_sdexternal) {
        this._sdexternal = in_sdexternal;
    }

    get phoneinfo() {
        return this._phoneinfo;
    }
    set phoneinfo(in_phoneinfo) {
        this._phoneinfo = in_phoneinfo;
    }

    get networkinfo() {
        return this._networkinfo;
    }
    set networkinfo(in_networkinfo) {
        this._networkinfo = in_networkinfo;
    }

    get hardwareinfo() {
        return this._hardwareinfo;
    }
    set hardwareinfo(in_hardwareinfo) {
        this._hardwareinfo = in_hardwareinfo;
    }

    get sensorinfo() {
        return this._sensorinfo;
    }
    set sensorinfo(in_sensorinfo) {
        this._sensorinfo = in_sensorinfo;
    }

    get accounts() {
        return this._accounts;
    }
    set accounts(in_accounts) {
        this._accounts = in_accounts;
    }

    get appversion() {
        return this._appversion;
    }
     set appversion(in_appversion) {
        this._appversion = in_appversion;
    }

    get lastwifi() {
        return this._lastwifi;
    }
    set lastwifi(in_lastwifi) {
        this._lastwifi = in_lastwifi;
    }
                
    get ringmode() {
        return this._ringmode;
    }
    set ringmode(in_ringmode) {
        this._ringmode = in_ringmode;
    }


    listMain(id,userbind,imei,carrier,battery,connection,lastwifi,ringmode,device,os,binddate,lastseen,appversion){
    this.id = id;
    this.userbind = userbind;
    this.imei = imei;
    this.carrier = carrier;
    this.battery = battery;
    this.connection = connection;
    this.lastwifi = lastwifi;
    this.ringmode = ringmode;
    this.device = device;
    this.os = os;
    this.binddate = binddate;
    this.lastseen = lastseen;
    this.appversion = appversion;
    return this
    }

}
