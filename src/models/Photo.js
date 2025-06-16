import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class photo extends Model{
  static init(sequelize){
    super.init(
      {
        originalname: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar em branco',
            },
          },
        },
        filename: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar em branco',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get(){
            return `${appConfig.url}/images/${this.getDataValue('filename')}`
          }
        }
      },
      {
        sequelize,
        modelName: 'Photo',
      }
    );
    return this
  }

  static associate(models){
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id'})
  }
}
