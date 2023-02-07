"use strict";

const OrdersRepository = require("../repository/orders.repository.js");
const Status = require("../middleware/status.code");

const { Order, Order_product, Cart } = require("../../sequelize/models");

class OrdersService {
  ordersRepository = new OrdersRepository(Order, Order_product, Cart);
  code = new Status();

  orderArt = async (userId, productId, count) => {
    try {
      if (!productId || !count) {
        return this.code.badRequest("잘못된 요청입니다.");
      }
      const createOrder = await this.ordersRepository.createOrder(userId);

      const orderDetail = await this.ordersRepository.createOrderDetail(
        createOrder.id,
        productId,
        count
      );

      return this.code.created(orderDetail, "주문이 완료되었습니다.");
    } catch {
      throw new Error();
    }
  };

  orderCart = async (userId) => {
    try {
      const myCart = await this.ordersRepository.myCart(userId);
      if (!myCart.length) {
        return this.code.badRequest("장바구니에 상품이 존재하지 않습니다");
      }
      const createOrder = await this.ordersRepository.createOrder(userId);
      const myCartDetail = await myCart.map((detail) => ({
        count: detail.count,
        order_id: createOrder.id,
        product_id: detail.product_id,
      }));

      for (const detail of myCartDetail) {
        await this.ordersRepository.createOrderDetail(
          detail.order_id,
          detail.product_id,
          detail.count
        );
      }
      // forEach는 배열의 각 항목에 비동기 처리가 불가능하다?
      // myCartDetail.forEach(detail => {
      //   this.ordersRepository.createOrderDetail(detail.order_id,detail.product_id,detail.count)
      // });

      await this.ordersRepository.clearCart(userId);
      return this.code.created(myCartDetail, "장바구니 주문이 완료되었습니다");
    } catch {
      throw new Error();
    }
  };

  cancelOrder = async (order_id, user_id) => {
    try {
      const orderStautsChange = await this.ordersRepository.orderStatusChange(
        order_id,
        user_id
      );
      if (orderStautsChange === 1 | 2 | 3) {
        return this.code.badRequest("주문을 취소할 수 없습니다.");
      }
      const cancelData = await this.ordersRepository.cancelOrder(order_id);
      return this.code.ok(cancelData, "주문이 취소되었습니다.");
    } catch {
      throw new Error();
    }
  };

  orderList = async (user_id) => {
    try {
      const orderList = await this.ordersRepository.orderList(user_id);
      return this.code.ok(orderList, "주문 이력 조회");
    } catch {
      throw new Error();
    }
  };

  orderDetail = async (orderId) => {
    try {
      const orderDetail = await this.ordersRepository.orderDetail(orderId);
      if (!orderDetail.length) {
        return this.code.badRequest("해당 건은 조회할 수 없습니다.");
      }

      return this.code.ok(orderDetail, "주문 상세 조회");
    } catch {
      throw new Error();
    }
  };
}

module.exports = OrdersService;
