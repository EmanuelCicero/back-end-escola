import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model{
  static init(sequelize){
    super.init(
      {
        nome: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            len: {
              args: [3, 100],
              msg: 'O nome deve ter entre 3 e 100 caracteres',
            },
            notEmpty: {
              msg: 'O nome não pode ser em branco',
            },
          },
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: {
            msg: 'E-mail já cadastrado',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido',
            },
            notEmpty: {
              msg: 'O e-mail não pode ser em branco',
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: 'Idade deve ser um número inteiro',
            },
            min: {
              args: [0],
              msg: 'Idade não pode ser negativa',
            },
          },
        },
        peso: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'Peso deve ser um número',
            },
            min: {
              args: [0],
              msg: 'Peso não pode ser negativo',
            },
          },
        },
        altura: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'Altura deve ser um número',
            },
            min: {
              args: [0],
              msg: 'Altura não pode ser negativa',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'Aluno',
      }
    );
    return this
  }

  static associate(models){
    this.hasMany(models.Photo, { foreignKey: 'aluno_id' })
  }
}
