"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thought = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base_entity"));
const user_1 = require("./user");
let Thought = class Thought extends base_entity_1.default {
    constructor(user, content) {
        super();
        this.user = user;
        this.content = content;
    }
};
exports.Thought = Thought;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.thoughts, {
        onDelete: 'CASCADE',
        eager: true,
    })
], Thought.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false })
], Thought.prototype, "content", void 0);
exports.Thought = Thought = __decorate([
    (0, typeorm_1.Entity)()
], Thought);
//# sourceMappingURL=thought.js.map