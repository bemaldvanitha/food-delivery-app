class Shop{
    constructor(id,name,rating,ratedNumber,imageUrl,detail,offers,locationInString,locationInLatLng,offeredCategoryIds) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.ratedNumber = ratedNumber;
        this.imageUrl = imageUrl;
        this.detail = detail;
        this.offers = offers;
        this.locationInString = locationInString;
        this.locationInLatLng = locationInLatLng;
        this.offeredCategoryIds = offeredCategoryIds;
    }
}

export default Shop;