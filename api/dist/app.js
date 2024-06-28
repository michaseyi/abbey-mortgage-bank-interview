"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./database/db"));
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
app.use((0, cors_1.default)());
app.use(routes_1.default.routes());
db_1.default.initialize()
    .then(() => {
    console.log('Database has been initialized!');
    app.listen(config_1.default.app.port, () => {
        console.log('Server has started!');
    });
})
    .catch((err) => {
    console.error('Error during database initialization:', err);
});
//# sourceMappingURL=app.js.map