class FoodItem{
    constructor(id,catId,shopId,name,description,fullPortionPrice,halfPortionPrice,imageUrl,rating,ratedNumber,isVegan,isVegetarian,isSugarFree) {
        this.id = id;
        this.catId = catId;
        this.shopId = shopId;
        this.name = name;
        this.description = description;
        this.fullPortionPrice = fullPortionPrice;
        this.halfPortionPrice = halfPortionPrice;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.ratedNumber = ratedNumber;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.isSugarFree = isSugarFree;
    }
}

export default FoodItem;