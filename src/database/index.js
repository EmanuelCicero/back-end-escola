import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Student';
import User from '../models/User';
import Photos from '../models/Photo'

const models = [Aluno, User, Photos];

const connection = new Sequelize(databaseConfig);

models.forEach((model => model.init(connection)))
models.forEach((model) => model.associate && model.associate(connection.models))
