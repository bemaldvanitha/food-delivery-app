class Orders{
    constructor(id,items,notes,totalAmount,userId,userName,userLocation,shopId,shopName,shopLocation,date,
                isShopAccept,isShopCompleted,isDeliverAccept,isDeliverCompleted) {
        this.id = id;
        this.items = items;
        this.notes = notes;
        this.totalAmount = totalAmount;
        this.userId = userId;
        this.userName = userName;
        this.userLocation = userLocation;
        this.shopId = shopId;
        this.shopName = shopName;
        this.shopLocation = shopLocation;
        this.date = date;
        this.isShopAccept = isShopAccept;
        this.isShopCompleted = isShopCompleted;
        this.isDeliverAccept = isDeliverAccept;
        this.isDeliverCompleted = isDeliverCompleted;
    }
}

export default Orders;
