import { ForeignKeyConstraintError } from 'sequelize'
import Aluno from '../models/Student'
import Photo from '../models/Photo'

class AlunoController{
  async index(req, res){
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename']
      }
    })
    res.json(alunos)
  }

  async store(req, res){
    try{
      const aluno = await Aluno.create(req.body)
      return res.json(aluno)
    }
    catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }

  async show(req, res){
    try{
      const { id } =  req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename']
        }
      })

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      return res.json(aluno)
    }
    catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  
  async delete(req, res){
    try{
      const { id } =  req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      await aluno.destroy()
      return res.json({message: 'Aluno deletado com sucesso'})
    }
    catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  async update(req, res){
    try{
      const { id } =  req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }

      const alunoAtt = await aluno.update(req.body)

      return res.json(alunoAtt)
    }
    catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
}

export default new AlunoController();
