class User{
    constructor(id,firstName,lastName,address,telNumber,email,imageUrl,locationName,locationLatLng,favoriteFoodIds,favoriteShopIds,isDeliverMan,isShopOwner) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.telNumber = telNumber;
        this.email = email;
        this.imageUrl = imageUrl;
        this.locationName = locationName;
        this.locationLatLng = locationLatLng;
        this.favoriteFoodIds = favoriteFoodIds;
        this.favoriteShopIds = favoriteShopIds;
        this.isDeliverMan= isDeliverMan;
        this.isShopOwner =isShopOwner;
    }
}

export default User;