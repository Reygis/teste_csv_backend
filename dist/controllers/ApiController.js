"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const app_root_path_1 = __importDefault(require("app-root-path"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ApiController {
}
exports.ApiController = ApiController;
_a = ApiController;
ApiController.getByQuery = async (req, res) => {
    const searchTerm = req.query.q;
    const directory = `${app_root_path_1.default}/ftp`;
    if (!searchTerm) {
        return res.status(400).json({ message: 'no terms to search' });
    }
    fs_1.default.readdir(directory, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'internal server error' });
        }
        const matchingFiles = [];
        files.forEach((file) => {
            const filePath = path_1.default.join(directory, file);
            const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
            if (fileContent.includes(searchTerm)) {
                matchingFiles.push({ [file]: fileContent });
            }
        });
        res.status(200).json({ data: matchingFiles });
    });
};
ApiController.create = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res
            .status(500)
            .json({ message: 'No files was uploaded in form-data' });
    }
    // Object.keys to get any input field sended in formdata'
    const sampleFile = req.files[Object.keys(req.files)[0]];
    if (!sampleFile.name.includes('csv') && !sampleFile.name.includes('txt')) {
        return res
            .status(500)
            .json({ message: 'The file must be a .txt or .csv type' });
    }
    //Use date for single file name
    const uploadPath = `${app_root_path_1.default}/ftp/${Date.now()}.txt`;
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json({ message: 'internal server error' });
        }
        res.status(200).json({ message: 'The file was uploaded successfully.' });
    });
};
