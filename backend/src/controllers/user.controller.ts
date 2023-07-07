import express from 'express';
import UserModel from '../models/user';
import AgencyModel from '../models/agency';
import path from 'path';
import fs from 'fs';

export class UserController {

    register = (req: express.Request, res: express.Response) => {
        if (req.body.type == "client") {
            this.clientRegister(req, res);
        }
        else {
            this.agencyRegister(req, res);
        }
    }

    clientRegister = (req: express.Request, res: express.Response) => {
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

    agencyRegister = (req: express.Request, res: express.Response) => {
        let agency = new AgencyModel(req.body);
        agency.valid = false;
        agency.comments = [];

        UserModel.updateOne({'username': 'admin'}, {$push: {'requests': agency.username}}, (err, resp) => {
            if (err) {
                console.log(err);
            }
        });

        agency.save((err, resp) => {
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
                if (user != null) {
                    res.json(user);
                }
                else {
                    AgencyModel.findOne({'username': username, 'password': password}, (err, agency) => {
                        if (err) {
                            console.log(err); // prijaviti gresku o pogresno unetim podacima
                        }
                        else {
                            res.json(agency);
                        }
                    });
                }
            }
        });
    }

    getId = (req: express.Request, res: express.Response) => {
        let type = req.query.param;

        if (type == "client") {
            UserModel.findOne({}).sort({"id": -1}).limit(1).exec((err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            }); 
        }
        else {
            AgencyModel.findOne({}).sort({"id": -1}).limit(1).exec((err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        }
    }

    getLoggedUser = (req: express.Request, res: express.Response) => {
        let param = req.query.param;

        UserModel.findOne({'username': param}, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                if (user != null) {
                    res.json(user);
                }
                else {
                    AgencyModel.findOne({'username': param}, (err, agency) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json(agency);
                        }
                    })
                }
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
        let type = req.body.userType;

        if (!req.body.blob) {
            let imagePath = `uploads\\default.jpg`;
            const fullPath = path.join(__dirname, '../../', imagePath);
    
            fs.readFile(fullPath, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal server error');
                }
                imageBlob = `data:image/jpeg;base64,` + data.toString('base64');
                if (type == "client") {  
                    this.updateClientPicture(imageBlob, req, res);
                }
                else {
                    this.updateAgencyPicture(imageBlob, req, res);
                }
            });
        }
        else {
            imageBlob = req.body.blob;
            if (type == "client") {  
                this.updateClientPicture(imageBlob, req, res);
            }
            else {
                this.updateAgencyPicture(imageBlob, req, res);
            }
        }
    }

    updateClientPicture(imageBlob: string, req: express.Request, res: express.Response) {
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

    updateAgencyPicture(imageBlob: string, req: express.Request, res: express.Response) {
        AgencyModel.findOne({'username': req.params.username}, (err, user) => {
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
    
    getUserById = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let type = req.body.type;

        if (type == "client") {
            UserModel.findOne({'id': id}, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        }
        else {
            AgencyModel.findOne({'id': id}, (err, agency) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(agency);
                }
            });
        }
    }

    getUserByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let type = req.body.type;

        if (type == "client") {
            UserModel.findOne({'username': username, 'type': 'client'}, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        }
        else {
            AgencyModel.findOne({'username': username, 'type': 'agency'}, (err, agency) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(agency);
                }
            });
        }
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;

        if (type == "client" || type == "admin") {
            UserModel.updateOne({'username': username},
                {$set: {'password': password}},
                (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({'message': 'ok'});
                }
            });
        }
        else {
            AgencyModel.updateOne({'username': username},
                {$set: {'password': password}},
                (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({'message': 'ok'});
                }
            });
        }
    }
}