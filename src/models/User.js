import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model{
  static init(sequelize){
    super.init({ 
      nome:{
        type: Sequelize.STRING(100),
        defaultValue: '',
        validate:{
          len:{
            args: [3, 100],
            msg: 'O nome deve ter entre 3 e 100 caracteres.'
          }
        }
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        defaultValue: '',
        validate:{
          isEmail:{
            msg: 'Email inválido.'
          }
        }
      },
      password_hash:{
        type: Sequelize.STRING(100),
        defaultValue: '',
      },
      password:{
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate:{
          len:{
            args: [6, 100],
            msg: 'A senha deve ter entre 6 e 50 caracteres.'
          }
        }
      }

    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
    return this
  }

  passwordIsValid(password){
    return bcrypt.compare(password, this.password_hash);
  }
}
