class OrdersService {

  constructor(){
  }
  async Create(data) {
    return data;
  }

  async Find() {
    return [];
  }

  async FindOne(id) {
    return { id };
  }

  async Update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async Delete(id) {
    return { id };
  }

}

export default OrdersService;