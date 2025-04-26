"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("./orders.entity");
const typeorm_2 = require("typeorm");
const orders_gateway_1 = require("./orders.gateway");
let OrdersService = class OrdersService {
    ordersRepository;
    ordersGateway;
    constructor(ordersRepository, ordersGateway) {
        this.ordersRepository = ordersRepository;
        this.ordersGateway = ordersGateway;
    }
    getOrders() {
        return this.ordersRepository.query('Select name, count, order_id, number from orders WHERE status = "bending"');
    }
    getOrdersIDs() {
        return this.ordersRepository.query('SELECT DISTINCT order_id from orders');
    }
    finishOrder(orderID) {
        return this.ordersRepository.query('UPDATE orders SET status = "done" WHERE order_id = ?', [orderID]);
    }
    insertOrders(data) {
        const orderID = `#${Math.floor(Math.random() * 1000)}`;
        data.forEach(({ name, count, number, status }) => {
            this.ordersRepository.query('INSERT INTO orders (name, count, order_id, number, status) VALUES (?, ?, ?, ?, ?)', [name, count, orderID, number, status]);
        });
        this.ordersGateway.server.emit('new order', data, orderID);
        return 'Your Order Have been received';
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_gateway_1.OrdersGateway))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        orders_gateway_1.OrdersGateway])
], OrdersService);
//# sourceMappingURL=orders.service.js.map