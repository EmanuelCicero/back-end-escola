import User from '../models/User'

class UserController{
  async store(req, res){
    try{
      const newuser = await User.create(req.body)
      const {id, nome, email} = newuser
      return res.json({id, nome, email})}
    catch(e){
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
  async index(req, res){
    try{
      const users = await User.findAll({ attributes: ['id', 'nome', 'email']});
      return res.json(users)
    }catch(e){
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }

  async show(req, res){
    try{
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user
      return res.json({ id, nome, email })
    }catch(e){
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
  
  async update(req, res){
    try{
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(400).json({error: 'User not found'})
      }

      await user.update(req.body)
      const {id, nome, email} = user
      return res.json({id, nome, email})
    }catch(e){
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
  
  async delete(req, res){
    try{
      const user = await User.findByPk(req.userId);
      
      if(!user){
        return res.status(400).json({error: 'User not found'})
      }

      await user.destroy()

      return res.json({message: 'Usuário deletado com sucesso'})
    }catch(e){
      return res.status(400).json(e.errors.map((err) => err.message));
    }
  }
}

export default new UserController();
