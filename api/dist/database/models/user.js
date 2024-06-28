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
exports.UserFollowers = exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base_entity"));
const session_1 = require("./session");
const thought_1 = require("./thought");
const feed_1 = require("./feed");
let User = class User extends base_entity_1.default {
    constructor(email) {
        super();
        this.email = email;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, length: 255 })
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, unique: true })
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true })
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_1.Session, (session) => session.user)
], User.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => thought_1.Thought, (thought) => thought.user)
], User.prototype, "thoughts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feed_1.Feed, (feed) => feed.user)
], User.prototype, "feeds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserFollowers, (userFollowers) => userFollowers.follower)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserFollowers, (userFollowers) => userFollowers.following)
], User.prototype, "followers", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
let UserFollowers = class UserFollowers extends base_entity_1.default {
    constructor(user, following) {
        super();
        this.follower = user;
        this.following = following;
    }
};
exports.UserFollowers = UserFollowers;
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.following, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'follower_id' })
], UserFollowers.prototype, "follower", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.followers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'following_id' })
], UserFollowers.prototype, "following", void 0);
exports.UserFollowers = UserFollowers = __decorate([
    (0, typeorm_1.Entity)('follower_following'),
    (0, typeorm_1.Unique)(['follower', 'following'])
], UserFollowers);
//# sourceMappingURL=user.js.map