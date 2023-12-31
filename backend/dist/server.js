"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const agency_routes_1 = __importDefault(require("./routers/agency.routes"));
const client_routes_1 = __importDefault(require("./routers/client.routes"));
const admin_routes_1 = __importDefault(require("./routers/admin.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json({ limit: '1mb' }));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekat2023');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('connected to db');
});
const router = express_1.default.Router();
router.use('/user', user_routes_1.default);
router.use('/client', client_routes_1.default);
router.use('/agency', agency_routes_1.default);
router.use('/admin', admin_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map