class UserModel {
    
    constructor(user){
        this._email = user.email;
        this._name = user.name || "";
        this._id = user.id || "";
        this._profile_image = user.profile_image || "";
        this._account_type = user.account_type || "";
        this._phone = user.phone || "";
        this.token = user.token || ""
        this.__password = user.password || "";
    }


}



module.exports = UserModel;