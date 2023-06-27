import express, { Request, Response } from 'express';
import multer, {File} from 'multer';
import { UserController } from '../controllers/user.controller';
import UserModel from '../models/user'

const UserRouter = express.Router();

let uploadImage = () => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads');
        },
        filename: (req, file, callback) => {
            callback(null, req.params.username + '_' +  file.originalname);
        }
    });
    const imageFilter = (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return callback(new Error('You can upload only images!'), false);
        }
        callback(null, true);
    }
    
    return multer({imageFilter, storage});
};


UserRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

UserRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

UserRouter.route('/getId').get(
    (req, res) => new UserController().getId(req, res)
);

UserRouter.post('/:username/upload', uploadImage().single('profilePicture'), (req: Request & {file: File}, res: Response) => {
    const file = req.file;
    
    UserModel.findOne({'username': req.params.username}, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            user['profilePicture'] = file.path;
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({'message': 'ok'});
                }
            })
        }
    })

});

export default UserRouter;