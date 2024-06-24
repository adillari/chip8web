"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var app = (0, express_1.default)();
var port = 7000;
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express_1.default.static('public/'));
app.get("/", function (req, res) {
    var roms = (0, fs_1.readdirSync)("public/roms/");
    res.render("index", { roms: roms });
});
app.listen(port);
