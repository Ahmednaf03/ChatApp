"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use("/api/auth", auth_route_1.default);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, TypeScript & Express!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
