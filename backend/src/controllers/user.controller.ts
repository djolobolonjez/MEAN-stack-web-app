import express from 'express';
import UserModel from '../models/user';
import path from 'path';
import fs from 'fs';

export class UserController {

    register = (req: express.Request, res: express.Response) => {
        let user = new UserModel(req.body);
        user.valid = false;

        UserModel.updateOne({'username': 'admin'}, {$push: {'requests': user.username}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        user.save((err, resp) => {
            if (err) {
                console.log(err); // prijaviti nekako drugacije gresku
            }
            else {
                res.json({'message': 'ok'});
            }
        });
    }

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user) => {
            if (err) {
                console.log(err); // prijaviti gresku o pogresno unetim podacima
            }
            else {
                res.json(user);
            }
        })
    }

    getId = (req: express.Request, res: express.Response) => {
        UserModel.findOne({}).sort({"id": -1}).limit(1).exec((err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        })
    }

    getImage = (req: express.Request, res: express.Response) => {
        UserModel.findOne({'username': req.params.username}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                const imageBlob = user['profilePicture'];

                res.status(200).json({'image': imageBlob});
            }
        })
    }

    upload = (req: express.Request, res: express.Response) => {
        let imageBlob: string;

        if (!req.body.blob) {
            let imagePath = `uploads\\default.jpg`;
            const fullPath = path.join(__dirname, '../../', imagePath);
    
            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal server error');
                }
                imageBlob = `data:image/jpeg;base64,` + data.toString('base64');
                this.updateProfilePicture(imageBlob, req, res);
            });
        }
        else {
            imageBlob = req.body.blob;
            this.updateProfilePicture(imageBlob, req, res);
        }
    }

    updateProfilePicture(imageBlob: string, req: express.Request, res: express.Response) {
        UserModel.findOne({'username': req.params.username}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                user['profilePicture'] = imageBlob;
                user.save((err, resp) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({'message': 'ok'});
                    }
                })
            }
        });
    }
 
}