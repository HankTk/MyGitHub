/**
 * Order
 */
export class OrderData {
  orderItems: any = [];

  firstName: string = '';
  lastName: string = '';
  email: string = '';

  street: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';

  clear() {
    this.orderItems = [];
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.street = '';
    this.city = '';
    this.state = '';
    this.zip = '';
  }

}
