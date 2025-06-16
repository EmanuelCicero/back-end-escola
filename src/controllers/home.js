import Aluno from '../models/Student'

class HomeController{
  async index(req, res){
    res.json('Alunos')
  }
}

export default new HomeController();
